import React from 'react'
import { useChat } from '@/hooks/useChat'
import { MessageList } from './MessageList'
import { cn } from '@/lib/utils'

interface ChatWindowProps {
  className?: string
}

/**
 * Main chat window component
 */
export function ChatWindow({ className }: ChatWindowProps) {
  const { 
    currentConversation, 
    isTyping, 
    isLoading, 
    error,
    hasMessages,
    getMessageCount
  } = useChat()

  if (isLoading) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!currentConversation) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No conversation selected
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the sidebar or start a new one
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex-1 flex flex-col', className)}>
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentConversation.title}
            </h2>
            <p className="text-sm text-gray-500">
              {getMessageCount()} message{getMessageCount() !== 1 ? 's' : ''}
            </p>
          </div>
          
          {currentConversation.mode && currentConversation.mode !== 'normal' && (
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                {currentConversation.mode === 'deepthink' ? 'DeepThink' : 'Research'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={currentConversation.messages}
        isTyping={isTyping}
        className="flex-1"
      />
    </div>
  )
}
