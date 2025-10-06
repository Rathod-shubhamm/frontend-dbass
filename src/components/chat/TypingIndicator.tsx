import React from 'react'
import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  className?: string
  isVisible?: boolean
}

/**
 * Typing indicator component for showing when AI is responding
 */
export function TypingIndicator({ className, isVisible = true }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className={cn('flex items-start space-x-3 p-4', className)}>
      {/* AI Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">AI</span>
        </div>
      </div>

      {/* Typing animation */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900">AI Assistant</span>
          <span className="text-xs text-gray-500">is typing...</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TypingBubbleProps {
  className?: string
  isVisible?: boolean
}

/**
 * Typing bubble component (alternative style)
 */
export function TypingBubble({ className, isVisible = true }: TypingBubbleProps) {
  if (!isVisible) return null

  return (
    <div className={cn('flex justify-start', className)}>
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm max-w-[80%]">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">AI is typing</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TypingDotsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'gray' | 'blue'
}

/**
 * Simple typing dots component
 */
export function TypingDots({ 
  className, 
  size = 'md', 
  color = 'gray' 
}: TypingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const colorClasses = {
    primary: 'bg-primary-500',
    gray: 'bg-gray-400',
    blue: 'bg-blue-500'
  }

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  )
}

interface TypingWaveProps {
  className?: string
  isVisible?: boolean
}

/**
 * Typing wave animation component
 */
export function TypingWave({ className, isVisible = true }: TypingWaveProps) {
  if (!isVisible) return null

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-gray-400 rounded-full animate-pulse"
          style={{
            height: '20px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  )
}

interface TypingPulseProps {
  className?: string
  isVisible?: boolean
}

/**
 * Typing pulse animation component
 */
export function TypingPulse({ className, isVisible = true }: TypingPulseProps) {
  if (!isVisible) return null

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  )
}
