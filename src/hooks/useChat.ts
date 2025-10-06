import { useChat as useChatContext } from '@/contexts/ChatContext'
import { useUI } from '@/contexts/UIContext'
import { ChatMode } from '@/types'
import { useCallback } from 'react'

/**
 * Enhanced chat hook that combines chat context with UI context
 * Provides additional functionality for chat interactions
 */
export function useChat() {
  const chatContext = useChatContext()
  const { isMobile, sidebarOpen, setSidebarOpen } = useUI()

  /**
   * Send message with enhanced functionality
   */
  const sendMessage = useCallback(async (content: string, mode: ChatMode = 'normal') => {
    // Close sidebar on mobile after sending message
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }

    // Call the original sendMessage function
    await chatContext.sendMessage(content, mode)
  }, [chatContext.sendMessage, isMobile, sidebarOpen, setSidebarOpen])

  /**
   * Create new conversation with enhanced functionality
   */
  const createNewConversation = useCallback(() => {
    const conversationId = chatContext.createNewConversation()
    
    // Close sidebar on mobile after creating conversation
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }

    return conversationId
  }, [chatContext.createNewConversation, isMobile, sidebarOpen, setSidebarOpen])

  /**
   * Select conversation with enhanced functionality
   */
  const selectConversation = useCallback((id: string) => {
    chatContext.selectConversation(id)
    
    // Close sidebar on mobile after selecting conversation
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [chatContext.selectConversation, isMobile, sidebarOpen, setSidebarOpen])

  /**
   * Check if a conversation is currently active
   */
  const isConversationActive = useCallback((conversationId: string) => {
    return chatContext.currentConversation?.id === conversationId
  }, [chatContext.currentConversation?.id])

  /**
   * Get the last message from a conversation
   */
  const getLastMessage = useCallback((conversationId: string) => {
    const conversation = chatContext.conversations.find(conv => conv.id === conversationId)
    if (!conversation || conversation.messages.length === 0) {
      return null
    }
    return conversation.messages[conversation.messages.length - 1]
  }, [chatContext.conversations])

  /**
   * Get conversation preview text (last message content)
   */
  const getConversationPreview = useCallback((conversationId: string, maxLength: number = 50) => {
    const lastMessage = getLastMessage(conversationId)
    if (!lastMessage) {
      return 'No messages yet'
    }
    
    const content = lastMessage.content
    if (content.length <= maxLength) {
      return content
    }
    
    return content.substring(0, maxLength) + '...'
  }, [getLastMessage])

  /**
   * Format conversation timestamp for display
   */
  const formatConversationTime = useCallback((conversationId: string) => {
    const conversation = chatContext.conversations.find(conv => conv.id === conversationId)
    if (!conversation) {
      return ''
    }
    
    const now = new Date()
    const diff = now.getTime() - conversation.updatedAt.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return conversation.updatedAt.toLocaleDateString()
  }, [chatContext.conversations])

  /**
   * Get conversation count
   */
  const getConversationCount = useCallback(() => {
    return chatContext.conversations.length
  }, [chatContext.conversations.length])

  /**
   * Check if there are any conversations
   */
  const hasConversations = useCallback(() => {
    return chatContext.conversations.length > 0
  }, [chatContext.conversations.length])

  /**
   * Check if current conversation has messages
   */
  const hasMessages = useCallback(() => {
    return chatContext.currentConversation?.messages.length > 0
  }, [chatContext.currentConversation?.messages.length])

  /**
   * Get message count for current conversation
   */
  const getMessageCount = useCallback(() => {
    return chatContext.currentConversation?.messages.length || 0
  }, [chatContext.currentConversation?.messages.length])

  /**
   * Check if chat is ready (not loading and no error)
   */
  const isChatReady = useCallback(() => {
    return !chatContext.isLoading && !chatContext.error
  }, [chatContext.isLoading, chatContext.error])

  /**
   * Check if chat is busy (loading or typing)
   */
  const isChatBusy = useCallback(() => {
    return chatContext.isLoading || chatContext.isTyping
  }, [chatContext.isLoading, chatContext.isTyping])

  return {
    // Original chat context
    ...chatContext,
    
    // Enhanced functions
    sendMessage,
    createNewConversation,
    selectConversation,
    
    // Utility functions
    isConversationActive,
    getLastMessage,
    getConversationPreview,
    formatConversationTime,
    getConversationCount,
    hasConversations,
    hasMessages,
    getMessageCount,
    isChatReady,
    isChatBusy
  }
}
