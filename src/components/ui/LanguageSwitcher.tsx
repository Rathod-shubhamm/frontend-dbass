import React from 'react'
import { useUI } from '@/contexts/UIContext'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  showLabel?: boolean
}

/**
 * Language switcher component for toggling between English and Hebrew
 */
export function LanguageSwitcher({ className, showLabel = true }: LanguageSwitcherProps) {
  const { language, setLanguage } = useUI()

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'he' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {showLabel && (
        <span className="text-sm text-gray-600">
          {language === 'en' ? 'Language' : 'שפה'}
        </span>
      )}
      
      <button
        onClick={handleLanguageChange}
        className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
        aria-label={`Switch to ${language === 'en' ? 'Hebrew' : 'English'}`}
      >
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'עב'}
        </span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </button>
    </div>
  )
}

interface LanguageOption {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' }
]

interface LanguageDropdownProps {
  className?: string
  showFlag?: boolean
  showNativeName?: boolean
}

/**
 * Language dropdown component with flag and native name support
 */
export function LanguageDropdown({ 
  className, 
  showFlag = true, 
  showNativeName = true 
}: LanguageDropdownProps) {
  const { language, setLanguage } = useUI()
  const [isOpen, setIsOpen] = React.useState(false)

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as 'en' | 'he')
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
        aria-label="Select language"
      >
        {showFlag && currentLanguage && (
          <span className="text-lg">{currentLanguage.flag}</span>
        )}
        <span className="text-sm font-medium">
          {showNativeName && currentLanguage 
            ? currentLanguage.nativeName 
            : currentLanguage?.name || 'EN'
          }
        </span>
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
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200',
                    language === lang.code && 'bg-primary-50 text-primary-700'
                  )}
                >
                  {showFlag && (
                    <span className="text-lg">{lang.flag}</span>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {showNativeName ? lang.nativeName : lang.name}
                    </span>
                    {showNativeName && lang.nativeName !== lang.name && (
                      <span className="text-xs text-gray-500">
                        {lang.name}
                      </span>
                    )}
                  </div>
                  {language === lang.code && (
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

interface LanguageToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Simple language toggle button
 */
export function LanguageToggle({ className, size = 'md' }: LanguageToggleProps) {
  const { language, setLanguage } = useUI()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'he' : 'en')
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Hebrew' : 'English'}`}
    >
      <span className="font-medium">
        {language === 'en' ? 'EN' : 'עב'}
      </span>
    </button>
  )
}

interface LanguageIndicatorProps {
  className?: string
  showFlag?: boolean
}

/**
 * Language indicator component (read-only)
 */
export function LanguageIndicator({ className, showFlag = true }: LanguageIndicatorProps) {
  const { language } = useUI()
  
  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {showFlag && currentLanguage && (
        <span className="text-lg">{currentLanguage.flag}</span>
      )}
      <span className="text-sm text-gray-600">
        {currentLanguage?.nativeName || 'English'}
      </span>
    </div>
  )
}
