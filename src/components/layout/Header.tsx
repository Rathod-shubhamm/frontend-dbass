import React from 'react'
import { useUI } from '@/contexts/UIContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

/**
 * Header component with app branding and controls
 */
export function Header({ className }: HeaderProps) {
  const { 
    sidebarOpen, 
    toggleSidebar, 
    setCurrentPage, 
    currentPage,
    theme,
    setTheme,
    isMobile 
  } = useUI()

  const handleSettingsClick = () => {
    setCurrentPage('settings')
  }

  const handleChatClick = () => {
    setCurrentPage('chat')
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className={cn(
      'bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between',
      'sticky top-0 z-40',
      className
    )}>
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        {/* App logo and title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            DBAAS Chat
          </h1>
        </div>
      </div>

      {/* Center section - Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        <button
          onClick={handleChatClick}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
            currentPage === 'chat'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          Chat
        </button>
        <button
          onClick={handleSettingsClick}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
            currentPage === 'settings'
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          Settings
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>

        {/* Language switcher */}
        <LanguageSwitcher showLabel={false} />

        {/* Settings button (mobile) */}
        {isMobile && (
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Settings"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}
