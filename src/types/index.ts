// Core chat types
export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isTyping?: boolean
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  mode?: ChatMode
}

export type ChatMode = 'normal' | 'deepthink' | 'research'

// UI State types
export interface UIState {
  sidebarOpen: boolean
  currentPage: 'chat' | 'settings'
  theme: 'light' | 'dark'
  language: 'en' | 'he'
  isMobile: boolean
}

export interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  isLoading: boolean
  isTyping: boolean
  error: string | null
}

// API types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface SendMessageRequest {
  message: string
  conversationId?: string
  mode: ChatMode
}

export interface SendMessageResponse {
  message: Message
  conversationId: string
}

// Component props types
export interface ChatMessageProps {
  message: Message
  isLast?: boolean
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  placeholder?: string
}

export interface ModeButtonsProps {
  selectedMode: ChatMode
  onModeChange: (mode: ChatMode) => void
}

export interface SidebarProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onConversationSelect: (id: string) => void
  onNewConversation: () => void
  isOpen: boolean
  onToggle: () => void
}

export interface HeaderProps {
  onToggleSidebar: () => void
  onSettingsClick: () => void
}

// Hook return types
export interface UseChatReturn {
  conversations: Conversation[]
  currentConversation: Conversation | null
  isLoading: boolean
  isTyping: boolean
  error: string | null
  sendMessage: (content: string, mode?: ChatMode) => Promise<void>
  createNewConversation: () => string
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  clearError: () => void
}

export interface UseDeviceDetectionReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

// Storage types
export interface StorageService {
  getItem: <T>(key: string) => T | null
  setItem: <T>(key: string, value: T) => void
  removeItem: (key: string) => void
  clear: () => void
}

// Constants
export const CHAT_MODES: { [key in ChatMode]: string } = {
  normal: 'Normal',
  deepthink: 'DeepThink',
  research: 'Research Longer'
}

export const STORAGE_KEYS = {
  CONVERSATIONS: 'chat_conversations',
  CURRENT_CONVERSATION: 'current_conversation_id',
  UI_STATE: 'ui_state',
  SETTINGS: 'user_settings'
} as const
