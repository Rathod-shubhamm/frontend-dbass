import { StorageService } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'

/**
 * Local storage service for persisting data
 * Handles serialization/deserialization and error handling
 */
export class LocalStorageService implements StorageService {
  /**
   * Check if localStorage is available
   */
  private isAvailable(): boolean {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Get item from localStorage with error handling
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available')
      return null
    }

    try {
      const item = localStorage.getItem(key)
      if (item === null) return null
      return JSON.parse(item)
    } catch (error) {
      console.error(`Failed to get item from localStorage with key "${key}":`, error)
      return null
    }
  }

  /**
   * Set item in localStorage with error handling
   */
  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available')
      return
    }

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to set item in localStorage with key "${key}":`, error)
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available')
      return
    }

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove item from localStorage with key "${key}":`, error)
    }
  }

  /**
   * Clear all localStorage items
   */
  clear(): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available')
      return
    }

    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }

  /**
   * Get all keys from localStorage
   */
  getAllKeys(): string[] {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available')
      return []
    }

    try {
      return Object.keys(localStorage)
    } catch (error) {
      console.error('Failed to get localStorage keys:', error)
      return []
    }
  }

  /**
   * Get storage usage information
   */
  getStorageInfo(): { used: number; available: number; total: number } {
    if (!this.isAvailable()) {
      return { used: 0, available: 0, total: 0 }
    }

    try {
      let used = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length
        }
      }

      // Estimate available space (most browsers limit to ~5-10MB)
      const total = 10 * 1024 * 1024 // 10MB estimate
      const available = total - used

      return { used, available, total }
    } catch (error) {
      console.error('Failed to get storage info:', error)
      return { used: 0, available: 0, total: 0 }
    }
  }
}

/**
 * Session storage service (data persists only for the current session)
 */
export class SessionStorageService implements StorageService {
  /**
   * Check if sessionStorage is available
   */
  private isAvailable(): boolean {
    try {
      const test = '__sessionStorage_test__'
      sessionStorage.setItem(test, test)
      sessionStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Get item from sessionStorage
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      console.warn('sessionStorage is not available')
      return null
    }

    try {
      const item = sessionStorage.getItem(key)
      if (item === null) return null
      return JSON.parse(item)
    } catch (error) {
      console.error(`Failed to get item from sessionStorage with key "${key}":`, error)
      return null
    }
  }

  /**
   * Set item in sessionStorage
   */
  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) {
      console.warn('sessionStorage is not available')
      return
    }

    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to set item in sessionStorage with key "${key}":`, error)
    }
  }

  /**
   * Remove item from sessionStorage
   */
  removeItem(key: string): void {
    if (!this.isAvailable()) {
      console.warn('sessionStorage is not available')
      return
    }

    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove item from sessionStorage with key "${key}":`, error)
    }
  }

  /**
   * Clear all sessionStorage items
   */
  clear(): void {
    if (!this.isAvailable()) {
      console.warn('sessionStorage is not available')
      return
    }

    try {
      sessionStorage.clear()
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error)
    }
  }
}

/**
 * Memory storage service (data stored in memory, lost on page refresh)
 */
export class MemoryStorageService implements StorageService {
  private storage = new Map<string, any>()

  getItem<T>(key: string): T | null {
    return this.storage.get(key) || null
  }

  setItem<T>(key: string, value: T): void {
    this.storage.set(key, value)
  }

  removeItem(key: string): void {
    this.storage.delete(key)
  }

  clear(): void {
    this.storage.clear()
  }
}

// Export singleton instances
export const localStorageService = new LocalStorageService()
export const sessionStorageService = new SessionStorageService()
export const memoryStorageService = new MemoryStorageService()

// Default storage service (localStorage)
export const storageService = localStorageService

/**
 * Utility functions for common storage operations
 */
export const storageUtils = {
  /**
   * Save conversations to storage
   */
  saveConversations: (conversations: any[]) => {
    storageService.setItem(STORAGE_KEYS.CONVERSATIONS, conversations)
  },

  /**
   * Load conversations from storage
   */
  loadConversations: () => {
    return storageService.getItem(STORAGE_KEYS.CONVERSATIONS) || []
  },

  /**
   * Save current conversation ID
   */
  saveCurrentConversationId: (id: string | null) => {
    if (id) {
      storageService.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, id)
    } else {
      storageService.removeItem(STORAGE_KEYS.CURRENT_CONVERSATION)
    }
  },

  /**
   * Load current conversation ID
   */
  loadCurrentConversationId: (): string | null => {
    return storageService.getItem(STORAGE_KEYS.CURRENT_CONVERSATION)
  },

  /**
   * Save UI state
   */
  saveUIState: (state: any) => {
    storageService.setItem(STORAGE_KEYS.UI_STATE, state)
  },

  /**
   * Load UI state
   */
  loadUIState: () => {
    return storageService.getItem(STORAGE_KEYS.UI_STATE) || {}
  },

  /**
   * Save user settings
   */
  saveUserSettings: (settings: any) => {
    storageService.setItem(STORAGE_KEYS.USER_SETTINGS, settings)
  },

  /**
   * Load user settings
   */
  loadUserSettings: () => {
    return storageService.getItem(STORAGE_KEYS.USER_SETTINGS) || {}
  },

  /**
   * Save theme preference
   */
  saveTheme: (theme: 'light' | 'dark') => {
    storageService.setItem(STORAGE_KEYS.THEME, theme)
  },

  /**
   * Load theme preference
   */
  loadTheme: (): 'light' | 'dark' => {
    return storageService.getItem(STORAGE_KEYS.THEME) || 'light'
  },

  /**
   * Save language preference
   */
  saveLanguage: (language: 'en' | 'he') => {
    storageService.setItem(STORAGE_KEYS.LANGUAGE, language)
  },

  /**
   * Load language preference
   */
  loadLanguage: (): 'en' | 'he' => {
    return storageService.getItem(STORAGE_KEYS.LANGUAGE) || 'en'
  },

  /**
   * Clear all app data
   */
  clearAllData: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      storageService.removeItem(key)
    })
  }
}
