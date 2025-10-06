import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { UIState } from '@/types'
import { storageUtils } from '@/services/storage'
import { isMobile, isTablet, isDesktop } from '@/utils/helpers'
import { UI_CONSTANTS } from '@/utils/constants'

// Initial state
const initialState: UIState = {
  sidebarOpen: !isMobile(), // Open by default on desktop
  currentPage: 'chat',
  theme: 'light',
  language: 'en',
  isMobile: isMobile()
}

// Action types
type UIAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE'; payload: 'chat' | 'settings' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'he' }
  | { type: 'SET_IS_MOBILE'; payload: boolean }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<UIState> }

// Reducer function
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    
    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.payload }
    
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    
    case 'SET_IS_MOBILE':
      return { ...state, isMobile: action.payload }
    
    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload }
    
    default:
      return state
  }
}

// Context type
interface UIContextType extends UIState {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setCurrentPage: (page: 'chat' | 'settings') => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'en' | 'he') => void
  isTablet: boolean
  isDesktop: boolean
}

// Context
const UIContext = createContext<UIContextType | undefined>(undefined)

// Provider component
interface UIProviderProps {
  children: ReactNode
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  // Load saved state on mount
  useEffect(() => {
    const savedState = storageUtils.loadUIState()
    if (savedState) {
      dispatch({ type: 'LOAD_SAVED_STATE', payload: savedState })
    }
  }, [])

  // Save state to storage whenever it changes
  useEffect(() => {
    const { sidebarOpen, currentPage, theme, language, isMobile } = state
    storageUtils.saveUIState({ sidebarOpen, currentPage, theme, language, isMobile })
  }, [state])

  // Save theme preference
  useEffect(() => {
    storageUtils.saveTheme(state.theme)
  }, [state.theme])

  // Save language preference
  useEffect(() => {
    storageUtils.saveLanguage(state.language)
  }, [state.language])

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = isMobile()
      if (mobile !== state.isMobile) {
        dispatch({ type: 'SET_IS_MOBILE', payload: mobile })
        
        // Auto-close sidebar on mobile
        if (mobile && state.sidebarOpen) {
          dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [state.isMobile, state.sidebarOpen])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  // Apply language to document
  useEffect(() => {
    document.documentElement.lang = state.language
  }, [state.language])

  // Action creators
  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  const setSidebarOpen = (open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open })
  }

  const setCurrentPage = (page: 'chat' | 'settings') => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
    
    // Close sidebar on mobile when navigating
    if (state.isMobile) {
      dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })
    }
  }

  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const setLanguage = (language: 'en' | 'he') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language })
  }

  // Computed values
  const isTabletDevice = isTablet()
  const isDesktopDevice = isDesktop()

  // Context value
  const value: UIContextType = {
    ...state,
    toggleSidebar,
    setSidebarOpen,
    setCurrentPage,
    setTheme,
    setLanguage,
    isTablet: isTabletDevice,
    isDesktop: isDesktopDevice
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

// Custom hook to use UI context
export function useUI(): UIContextType {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

// Export types
export type { UIContextType }
