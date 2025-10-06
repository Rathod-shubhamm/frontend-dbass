import React from 'react'

import { useUI } from '@/contexts/UIContext'
import { useChat } from '@/hooks/useChat'
import { ConversationList } from './ConversationItem'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

/**
 * Sidebar component with conversation history and controls
 */
export function Sidebar({ className }: SidebarProps) {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    isMobile 
  } = useUI()
  
  const {
    conversations,
    currentConversation,
    selectConversation,
    createNewConversation,
    deleteConversation
  } = useChat()

  const handleNewConversation = () => {
    createNewConversation()
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleConversationSelect = (id: string) => {
    selectConversation(id)
  }

  const handleConversationDelete = (id: string) => {
    deleteConversation(id)
  }

  // Close sidebar on mobile when clicking outside
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-r border-gray-200 flex flex-col h-full',
          'transition-transform duration-300 ease-in-out',
          isMobile
            ? 'fixed inset-y-0 left-0 z-50 w-80'
            : 'relative w-80',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversations
            </h2>
            <button
              onClick={handleNewConversation}
              className="p-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200"
              aria-label="New conversation"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-4">
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversation?.id || null}
            onConversationSelect={handleConversationSelect}
            onConversationDelete={handleConversationDelete}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </div>
        </div>
      </aside>
    </>
  )
}
