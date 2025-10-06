import React, { useState, useRef, useEffect } from 'react'
import { ChatMode } from '@/types'
import { ModeButtons } from './ModeButtons'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  onSendMessage: (message: string, mode?: ChatMode) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
  maxLength?: number
  showModeButtons?: boolean
  defaultMode?: ChatMode
}

/**
 * Message input component with send button and mode selection
 */
export function MessageInput({
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message...",
  className,
  maxLength = 4000,
  showModeButtons = true,
  defaultMode = 'normal'
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [selectedMode, setSelectedMode] = useState<ChatMode>(defaultMode)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  // Handle send message
  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim(), selectedMode)
      setMessage('')
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Handle mode change
  const handleModeChange = (mode: ChatMode) => {
    setSelectedMode(mode)
  }

  const canSend = message.trim().length > 0 && !isLoading
  const remainingChars = maxLength - message.length
  const isNearLimit = remainingChars < 100

  return (
    <div className={cn('border-t border-gray-200 bg-white p-4', className)}>
      {/* Mode buttons */}
      {showModeButtons && (
        <div className="mb-3">
          <ModeButtons
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end space-x-3">
        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            maxLength={maxLength}
            className={cn(
              'w-full px-4 py-3 border border-gray-300 rounded-lg resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all duration-200',
              'min-h-[50px] max-h-[200px]'
            )}
            rows={1}
          />
          
          {/* Character count */}
          {isNearLimit && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {remainingChars}
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            canSend
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Help text */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {selectedMode !== 'normal' && (
          <span className="text-primary-600">
            {selectedMode === 'deepthink' ? 'DeepThink mode' : 'Research mode'}
          </span>
        )}
      </div>
    </div>
  )
}

interface CompactMessageInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

/**
 * Compact message input for mobile or space-constrained layouts
 */
export function CompactMessageInput({
  onSendMessage,
  isLoading = false,
  placeholder = "Type a message...",
  className
}: CompactMessageInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend()
    }
  }

  const canSend = message.trim().length > 0 && !isLoading

  return (
    <div className={cn('flex items-center space-x-2 p-3 bg-white border-t border-gray-200', className)}>
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
      />
      
      <button
        onClick={handleSend}
        disabled={!canSend}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          canSend
            ? 'bg-primary-500 hover:bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Send message"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
