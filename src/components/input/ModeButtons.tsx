import React from 'react'
import { ChatMode } from '@/types'
import { cn } from '@/lib/utils'

interface ModeButtonsProps {
  selectedMode: ChatMode
  onModeChange: (mode: ChatMode) => void
  className?: string
  disabled?: boolean
}

/**
 * Mode selection buttons for different chat modes
 */
export function ModeButtons({ 
  selectedMode, 
  onModeChange, 
  className,
  disabled = false 
}: ModeButtonsProps) {
  const modes: { value: ChatMode; label: string; description: string; icon: string }[] = [
    {
      value: 'normal',
      label: 'Normal',
      description: 'Standard chat mode',
      icon: '💬'
    },
    {
      value: 'deepthink',
      label: 'DeepThink',
      description: 'More thoughtful responses',
      icon: '🧠'
    },
    {
      value: 'research',
      label: 'Research Longer',
      description: 'Comprehensive research mode',
      icon: '🔍'
    }
  ]

  return (
    <div className={cn('flex space-x-2', className)}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          disabled={disabled}
          className={cn(
            'flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            selectedMode === mode.value
              ? 'bg-primary-50 border-primary-200 text-primary-700'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          title={mode.description}
        >
          <span className="text-sm">{mode.icon}</span>
          <span className="text-sm font-medium">{mode.label}</span>
        </button>
      ))}
    </div>
  )
}

interface ModeDropdownProps {
  selectedMode: ChatMode
  onModeChange: (mode: ChatMode) => void
  className?: string
  disabled?: boolean
}

/**
 * Mode dropdown component for compact mode selection
 */
export function ModeDropdown({ 
  selectedMode, 
  onModeChange, 
  className,
  disabled = false 
}: ModeDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const modes: { value: ChatMode; label: string; description: string; icon: string }[] = [
    {
      value: 'normal',
      label: 'Normal',
      description: 'Standard chat mode',
      icon: '💬'
    },
    {
      value: 'deepthink',
      label: 'DeepThink',
      description: 'More thoughtful responses',
      icon: '🧠'
    },
    {
      value: 'research',
      label: 'Research Longer',
      description: 'Comprehensive research mode',
      icon: '🔍'
    }
  ]

  const selectedModeData = modes.find(mode => mode.value === selectedMode)

  const handleModeSelect = (mode: ChatMode) => {
    onModeChange(mode)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 bg-white',
          'hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="text-sm">{selectedModeData?.icon}</span>
        <span className="text-sm font-medium">{selectedModeData?.label}</span>
        <svg
          className={cn(
            'w-4 h-4 text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {modes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => handleModeSelect(mode.value)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200',
                    selectedMode === mode.value && 'bg-primary-50 text-primary-700'
                  )}
                >
                  <span className="text-sm">{mode.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{mode.label}</span>
                    <span className="text-xs text-gray-500">{mode.description}</span>
                  </div>
                  {selectedMode === mode.value && (
                    <svg
                      className="w-4 h-4 text-primary-600 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface ModeToggleProps {
  selectedMode: ChatMode
  onModeChange: (mode: ChatMode) => void
  className?: string
  disabled?: boolean
}

/**
 * Simple mode toggle component for switching between normal and advanced modes
 */
export function ModeToggle({ 
  selectedMode, 
  onModeChange, 
  className,
  disabled = false 
}: ModeToggleProps) {
  const isAdvanced = selectedMode !== 'normal'

  const handleToggle = () => {
    onModeChange(isAdvanced ? 'normal' : 'deepthink')
  }

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        'flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        isAdvanced
          ? 'bg-primary-50 border-primary-200 text-primary-700'
          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      title={isAdvanced ? 'Switch to normal mode' : 'Switch to advanced mode'}
    >
      <span className="text-sm">{isAdvanced ? '🧠' : '💬'}</span>
      <span className="text-sm font-medium">
        {isAdvanced ? 'Advanced' : 'Normal'}
      </span>
    </button>
  )
}
