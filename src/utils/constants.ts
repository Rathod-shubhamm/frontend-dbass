// App configuration constants
export const APP_CONFIG = {
  NAME: 'DBAAS Chat',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered chat interface',
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_THEME: 'light',
  MAX_MESSAGE_LENGTH: 4000,
  TYPING_DELAY: 1000,
  API_TIMEOUT: 30000,
} as const

// UI constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
} as const

// Chat constants
export const CHAT_CONSTANTS = {
  MAX_CONVERSATIONS: 50,
  MAX_MESSAGES_PER_CONVERSATION: 1000,
  AUTO_SAVE_INTERVAL: 5000,
  TYPING_INDICATOR_DELAY: 500,
} as const

// API endpoints (placeholder for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  SEND_MESSAGE: '/chat/message',
  GET_CONVERSATIONS: '/chat/conversations',
  GET_CONVERSATION: '/chat/conversation',
  DELETE_CONVERSATION: '/chat/conversation',
  UPDATE_CONVERSATION: '/chat/conversation',
} as const

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_MESSAGE: 'Please enter a valid message.',
  MESSAGE_TOO_LONG: `Message too long. Maximum ${APP_CONFIG.MAX_MESSAGE_LENGTH} characters allowed.`,
  CONVERSATION_NOT_FOUND: 'Conversation not found.',
  FAILED_TO_SEND: 'Failed to send message. Please try again.',
  FAILED_TO_LOAD: 'Failed to load conversations.',
  FAILED_TO_DELETE: 'Failed to delete conversation.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: 'Message sent successfully.',
  CONVERSATION_CREATED: 'New conversation created.',
  CONVERSATION_DELETED: 'Conversation deleted successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  CONVERSATIONS: 'dbaas_chat_conversations',
  CURRENT_CONVERSATION: 'dbaas_current_conversation_id',
  UI_STATE: 'dbaas_ui_state',
  USER_SETTINGS: 'dbaas_user_settings',
  THEME: 'dbaas_theme',
  LANGUAGE: 'dbaas_language',
} as const

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
} as const

// Feature flags (for future use)
export const FEATURE_FLAGS = {
  ENABLE_VOICE_INPUT: false,
  ENABLE_FILE_UPLOAD: false,
  ENABLE_MARKDOWN: true,
  ENABLE_CODE_HIGHLIGHTING: true,
  ENABLE_EXPORT: false,
  ENABLE_SHARING: false,
} as const
