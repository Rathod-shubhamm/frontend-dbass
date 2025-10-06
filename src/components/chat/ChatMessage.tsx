import React from 'react'
import { Message } from '@/types'
import { cn, formatChatDate, getAvatarColor, getInitials } from '@/lib/utils'

interface ChatMessageProps {
  message: Message
  isLast?: boolean
  className?: string
}

/**
 * Individual chat message component
 */
export function ChatMessage({ message, isLast = false, className }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  return (
    <div className={cn(
      'flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors duration-200',
      isLast && 'pb-6',
      className
    )}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        ) : (
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            getAvatarColor('AI')
          )}>
            <span className="text-white text-sm font-medium">AI</span>
          </div>
        )}
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {formatChatDate(message.timestamp)}
          </span>
        </div>

        {/* Message body */}
        <div className={cn(
          'prose prose-sm max-w-none',
          isUser ? 'text-gray-900' : 'text-gray-800'
        )}>
          <div
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                .replace(/\n/g, '<br>')
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={() => navigator.clipboard.writeText(message.content)}
          >
            Copy
          </button>
          {isAssistant && (
            <>
              <span className="text-xs text-gray-300">•</span>
              <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Regenerate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface MessageGroupProps {
  messages: Message[]
  className?: string
}

/**
 * Group of messages from the same sender
 */
export function MessageGroup({ messages, className }: MessageGroupProps) {
  if (messages.length === 0) return null

  const firstMessage = messages[0]
  const isUser = firstMessage.role === 'user'

  return (
    <div className={cn('group', className)}>
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  className?: string
}

/**
 * Message bubble component (alternative style)
 */
export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      'flex',
      isUser ? 'justify-end' : 'justify-start',
      className
    )}>
      <div className={cn(
        'max-w-[80%] rounded-lg px-4 py-2 shadow-sm',
        isUser
          ? 'bg-primary-500 text-white'
          : 'bg-white text-gray-900 border border-gray-200'
      )}>
        <div className="whitespace-pre-wrap break-words text-sm">
          {message.content}
        </div>
        <div className={cn(
          'text-xs mt-1',
          isUser ? 'text-primary-100' : 'text-gray-500'
        )}>
          {formatChatDate(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

interface MessageActionsProps {
  message: Message
  onCopy?: (content: string) => void
  onRegenerate?: (messageId: string) => void
  className?: string
}

/**
 * Message actions component
 */
export function MessageActions({ 
  message, 
  onCopy, 
  onRegenerate, 
  className 
}: MessageActionsProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    onCopy?.(message.content)
  }

  const handleRegenerate = () => {
    onRegenerate?.(message.id)
  }

  return (
    <div className={cn(
      'flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
      className
    )}>
      <button
        onClick={handleCopy}
        className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        Copy
      </button>
      
      {message.role === 'assistant' && (
        <>
          <span className="text-xs text-gray-300">•</span>
          <button
            onClick={handleRegenerate}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Regenerate
          </button>
        </>
      )}
    </div>
  )
}
