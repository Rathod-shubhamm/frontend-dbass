import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { ChatState, Conversation, Message, ChatMode, UseChatReturn } from '@/types'
import { apiService } from '@/services/api'
import { storageUtils } from '@/services/storage'
import { createMessage, updateConversationWithMessage, limitConversations } from '@/utils/helpers'
import { CHAT_CONSTANTS } from '@/utils/constants'

// Initial state
const initialState: ChatState = {
  conversations: [],
  currentConversationId: null,
  isLoading: false,
  isTyping: false,
  error: null
}

// Action types
type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'UPDATE_CONVERSATION'; payload: Conversation }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }

// Reducer function
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload }
    
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id
      }
    
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? action.payload : conv
        )
      }
    
    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter(conv => conv.id !== action.payload),
        currentConversationId: state.currentConversationId === action.payload ? null : state.currentConversationId
      }
    
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversationId: action.payload }
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? updateConversationWithMessage(conv, action.payload.message)
            : conv
        )
      }
    
    default:
      return state
  }
}

// Context
const ChatContext = createContext<UseChatReturn | undefined>(undefined)

// Provider component
interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  // Load initial data
  useEffect(() => {
    loadConversations()
    loadCurrentConversation()
  }, [])

  // Save conversations to storage whenever they change
  useEffect(() => {
    if (state.conversations.length > 0) {
      storageUtils.saveConversations(state.conversations)
    }
  }, [state.conversations])

  // Save current conversation ID whenever it changes
  useEffect(() => {
    storageUtils.saveCurrentConversationId(state.currentConversationId)
  }, [state.currentConversationId])

  /**
   * Load conversations from API
   */
  const loadConversations = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await apiService.getConversations()
      
      if (response.success) {
        const limitedConversations = limitConversations(response.data)
        dispatch({ type: 'SET_CONVERSATIONS', payload: limitedConversations })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to load conversations' })
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load conversations' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  /**
   * Load current conversation from storage
   */
  const loadCurrentConversation = () => {
    const savedId = storageUtils.loadCurrentConversationId()
    if (savedId) {
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: savedId })
    }
  }

  /**
   * Send a message
   */
  const sendMessage = async (content: string, mode: ChatMode = 'normal') => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null })
      
      // Create user message
      const userMessage = createMessage(content, 'user')
      
      // Add user message immediately for better UX
      if (state.currentConversationId) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { conversationId: state.currentConversationId, message: userMessage }
        })
      }
      
      // Show typing indicator
      dispatch({ type: 'SET_TYPING', payload: true })
      
      // Send message to API
      const response = await apiService.sendMessage({
        message: content,
        conversationId: state.currentConversationId || undefined,
        mode
      })
      
      if (response.success) {
        const { message: aiMessage, conversationId } = response.data
        
        // Update current conversation ID if it's a new conversation
        if (!state.currentConversationId) {
          dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversationId })
        }
        
        // Add AI message
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { conversationId, message: aiMessage }
        })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to send message' })
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' })
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false })
    }
  }

  /**
   * Create a new conversation
   */
  const createNewConversation = (): string => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      mode: 'normal'
    }
    
    dispatch({ type: 'ADD_CONVERSATION', payload: newConversation })
    return newConversation.id
  }

  /**
   * Select a conversation
   */
  const selectConversation = (id: string) => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: id })
  }

  /**
   * Delete a conversation
   */
  const deleteConversation = async (id: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await apiService.deleteConversation(id)
      
      if (response.success) {
        dispatch({ type: 'DELETE_CONVERSATION', payload: id })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to delete conversation' })
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete conversation' })
    }
  }

  /**
   * Clear error
   */
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }

  // Get current conversation
  const currentConversation = state.conversations.find(
    conv => conv.id === state.currentConversationId
  ) || null

  // Context value
  const value: UseChatReturn = {
    conversations: state.conversations,
    currentConversation,
    isLoading: state.isLoading,
    isTyping: state.isTyping,
    error: state.error,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    clearError
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

// Custom hook to use chat context
export function useChat(): UseChatReturn {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
