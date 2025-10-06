import React from 'react'
import { useUI } from '@/contexts/UIContext'
import { Header } from '@/components/layout/Header'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

/**
 * Settings page component
 */
export function SettingsPage() {
  const { 
    theme, 
    setTheme, 
    language, 
    setLanguage,
    isMobile 
  } = useUI()

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'he') => {
    setLanguage(newLanguage)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Customize your chat experience and preferences
            </p>
          </div>

          {/* Settings sections */}
          <div className="space-y-8">
            {/* Appearance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Appearance
              </h2>
              
              <div className="space-y-4">
                {/* Theme selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200',
                        theme === 'light'
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>Light</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200',
                        theme === 'dark'
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Language
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interface Language
                  </label>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>

            {/* Chat Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Chat Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Auto-save conversations
                    </h3>
                    <p className="text-sm text-gray-500">
                      Automatically save your chat history
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors duration-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Typing indicators
                    </h3>
                    <p className="text-sm text-gray-500">
                      Show when AI is typing
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors duration-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Message timestamps
                    </h3>
                    <p className="text-sm text-gray-500">
                      Show timestamps on messages
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Version
                  </h3>
                  <p className="text-sm text-gray-500">1.0.0</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="text-sm text-gray-500">
                    DBAAS Chat - A modern AI-powered chat interface built with React, TypeScript, and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  Export chat history
                </button>
                
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  Clear all conversations
                </button>
                
                <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  Reset to defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
