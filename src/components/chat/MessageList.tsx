import React, { useEffect, useRef } from 'react'
import { Message } from '@/types'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'
import { cn } from '@/lib/utils'

interface MessageListProps {
  messages: Message[]
  isTyping?: boolean
  className?: string
  autoScroll?: boolean
}

/**
 * Message list component with auto-scroll functionality
 */
export function MessageList({ 
  messages, 
  isTyping = false, 
  className,
  autoScroll = true 
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, autoScroll])

  // Group consecutive messages from the same sender
  const groupedMessages = React.useMemo(() => {
    const groups: Message[][] = []
    let currentGroup: Message[] = []

    messages.forEach((message, index) => {
      if (index === 0 || message.role !== messages[index - 1].role) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = [message]
      } else {
        currentGroup.push(message)
      }
    })

    if (currentGroup.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }, [messages])

  if (messages.length === 0 && !isTyping) {
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
            Start a conversation
          </h3>
          <p className="text-gray-500">
            Send a message to begin chatting with the AI assistant
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        'flex-1 overflow-y-auto scroll-smooth',
        className
      )}
    >
      <div className="space-y-0">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="group">
            {group.map((message, messageIndex) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={messageIndex === group.length - 1 && groupIndex === groupedMessages.length - 1 && !isTyping}
              />
            ))}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <TypingIndicator />
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

interface MessageContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Container for message list with proper styling
 */
export function MessageContainer({ children, className }: MessageContainerProps) {
  return (
    <div className={cn(
      'flex-1 flex flex-col bg-gray-50',
      className
    )}>
      {children}
    </div>
  )
}

interface MessageSeparatorProps {
  text?: string
  className?: string
}

/**
 * Message separator component for grouping messages by date
 */
export function MessageSeparator({ text, className }: MessageSeparatorProps) {
  return (
    <div className={cn('flex items-center my-4', className)}>
      <div className="flex-1 border-t border-gray-200" />
      <span className="px-3 text-xs text-gray-500 bg-gray-50">
        {text}
      </span>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  )
}

interface MessageDateGroupProps {
  date: string
  messages: Message[]
  isTyping?: boolean
  className?: string
}

/**
 * Message group component for messages from the same date
 */
export function MessageDateGroup({ 
  date, 
  messages, 
  isTyping = false, 
  className 
}: MessageDateGroupProps) {
  return (
    <div className={cn('space-y-0', className)}>
      <MessageSeparator text={date} />
      <MessageList 
        messages={messages} 
        isTyping={isTyping}
        autoScroll={false}
      />
    </div>
  )
}
