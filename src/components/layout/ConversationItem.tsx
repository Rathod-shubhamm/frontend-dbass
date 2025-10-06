import React from 'react'
import { Conversation } from '@/types'
import { useChat } from '@/hooks/useChat'
import { cn, formatTimestamp } from '@/lib/utils'

interface ConversationItemProps {
  conversation: Conversation
  isActive?: boolean
  onSelect?: (conversationId: string) => void
  onDelete?: (conversationId: string) => void
  className?: string
}

/**
 * Conversation item component for sidebar
 */
export function ConversationItem({
  conversation,
  isActive = false,
  onSelect,
  onDelete,
  className
}: ConversationItemProps) {
  const { getConversationPreview, formatConversationTime } = useChat()
  const [showDelete, setShowDelete] = React.useState(false)

  const handleSelect = () => {
    onSelect?.(conversation.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(conversation.id)
  }

  const preview = getConversationPreview(conversation.id, 60)
  const timeAgo = formatConversationTime(conversation.id)

  return (
    <div
      className={cn(
        'group relative p-3 rounded-lg cursor-pointer transition-all duration-200',
        'hover:bg-gray-50 border border-transparent hover:border-gray-200',
        isActive && 'bg-primary-50 border-primary-200',
        className
      )}
      onClick={handleSelect}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* Delete button */}
      {showDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200"
          aria-label="Delete conversation"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Conversation content */}
      <div className="pr-8">
        {/* Title */}
        <h3 className={cn(
          'font-medium text-sm truncate mb-1',
          isActive ? 'text-primary-900' : 'text-gray-900'
        )}>
          {conversation.title}
        </h3>

        {/* Preview */}
        <p className={cn(
          'text-xs truncate mb-2',
          isActive ? 'text-primary-700' : 'text-gray-600'
        )}>
          {preview}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Time */}
          <span className={cn(
            'text-xs',
            isActive ? 'text-primary-600' : 'text-gray-500'
          )}>
            {timeAgo}
          </span>

          {/* Mode indicator */}
          {conversation.mode && conversation.mode !== 'normal' && (
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              isActive 
                ? 'bg-primary-200 text-primary-800' 
                : 'bg-gray-200 text-gray-700'
            )}>
              {conversation.mode === 'deepthink' ? 'DeepThink' : 'Research'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

interface ConversationListProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onConversationSelect: (id: string) => void
  onConversationDelete: (id: string) => void
  className?: string
}

/**
 * Conversation list component
 */
export function ConversationList({
  conversations,
  currentConversationId,
  onConversationSelect,
  onConversationDelete,
  className
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className={cn('p-4 text-center', className)}>
        <div className="text-gray-500 mb-2">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
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
        <p className="text-sm text-gray-500 mb-4">
          No conversations yet
        </p>
        <p className="text-xs text-gray-400">
          Start a new conversation to begin chatting
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === currentConversationId}
          onSelect={onConversationSelect}
          onDelete={onConversationDelete}
        />
      ))}
    </div>
  )
}
