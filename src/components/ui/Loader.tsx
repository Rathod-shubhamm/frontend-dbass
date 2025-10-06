import React from 'react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

/**
 * Loading spinner component with different sizes and colors
 */
export function Loader({ size = 'md', color = 'primary', className }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    gray: 'text-gray-500'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

/**
 * Animated loading dots component
 */
export function LoadingDots({ size = 'md', color = 'primary', className }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const colorClasses = {
    primary: 'bg-primary-500',
    white: 'bg-white',
    gray: 'bg-gray-500'
  }

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
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

interface SkeletonProps {
  className?: string
  lines?: number
}

/**
 * Skeleton loading component for content placeholders
 */
export function Skeleton({ className, lines = 1 }: SkeletonProps) {
  if (lines === 1) {
    return (
      <div
        className={cn(
          'animate-pulse bg-gray-200 rounded',
          className
        )}
      />
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gray-200 rounded h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

interface TypingIndicatorProps {
  className?: string
}

/**
 * Typing indicator for chat messages
 */
export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center space-x-2 p-3', className)}>
      <div className="flex space-x-1">
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
      <span className="text-sm text-gray-500">AI is typing...</span>
    </div>
  )
}

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

/**
 * Progress bar component
 */
export function ProgressBar({ progress, className, showPercentage = false }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-center">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Loading overlay component that shows a spinner over content
 */
export function LoadingOverlay({ isLoading, children, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <Loader size="lg" />
        </div>
      )}
    </div>
  )
}

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

/**
 * Button component that shows loading state
 */
export function LoadingButton({
  isLoading,
  children,
  className,
  disabled,
  onClick,
  type = 'button'
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isLoading && <Loader size="sm" color="white" className="mr-2" />}
      {children}
    </button>
  )
}
