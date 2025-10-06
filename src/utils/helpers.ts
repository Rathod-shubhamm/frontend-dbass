import { Message, Conversation } from '@/types'
import { CHAT_CONSTANTS, APP_CONFIG } from './constants'

/**
 * Generate a unique ID for messages and conversations
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return timestamp.toLocaleDateString()
}

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

/**
 * Generate conversation title from first message
 */
export const generateConversationTitle = (firstMessage: string): string => {
  const words = firstMessage.trim().split(' ')
  const title = words.slice(0, 6).join(' ')
  return truncateText(title, 50)
}

/**
 * Validate message content
 */
export const validateMessage = (content: string): { isValid: boolean; error?: string } => {
  if (!content || content.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' }
  }
  
  if (content.length > APP_CONFIG.MAX_MESSAGE_LENGTH) {
    return { 
      isValid: false, 
      error: `Message too long. Maximum ${APP_CONFIG.MAX_MESSAGE_LENGTH} characters allowed.` 
    }
  }
  
  return { isValid: true }
}

/**
 * Create a new message object
 */
export const createMessage = (content: string, role: 'user' | 'assistant'): Message => {
  return {
    id: generateId(),
    content: content.trim(),
    role,
    timestamp: new Date(),
    isTyping: false
  }
}

/**
 * Create a new conversation object
 */
export const createConversation = (firstMessage?: string): Conversation => {
  const now = new Date()
  return {
    id: generateId(),
    title: firstMessage ? generateConversationTitle(firstMessage) : 'New Conversation',
    messages: firstMessage ? [createMessage(firstMessage, 'user')] : [],
    createdAt: now,
    updatedAt: now,
    mode: 'normal'
  }
}

/**
 * Update conversation with new message
 */
export const updateConversationWithMessage = (
  conversation: Conversation, 
  message: Message
): Conversation => {
  return {
    ...conversation,
    messages: [...conversation.messages, message],
    updatedAt: new Date(),
    title: conversation.messages.length === 0 
      ? generateConversationTitle(message.content)
      : conversation.title
  }
}

/**
 * Sort conversations by updated date (newest first)
 */
export const sortConversationsByDate = (conversations: Conversation[]): Conversation[] => {
  return [...conversations].sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

/**
 * Limit conversations to maximum allowed
 */
export const limitConversations = (conversations: Conversation[]): Conversation[] => {
  return sortConversationsByDate(conversations).slice(0, CHAT_CONSTANTS.MAX_CONVERSATIONS)
}

/**
 * Debounce function for input handling
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function for scroll handling
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * Check if device is mobile based on screen width
 */
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768
}

/**
 * Check if device is tablet based on screen width
 */
export const isTabletDevice = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Check if device is desktop based on screen width
 */
export const isDesktopDevice = (): boolean => {
  return window.innerWidth >= 1024
}

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Download text as file
 */
export const downloadAsFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Parse markdown-like formatting in messages
 */
export const parseMessageContent = (content: string): string => {
  // Simple markdown parsing for basic formatting
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

/**
 * Extract code blocks from message content
 */
export const extractCodeBlocks = (content: string): Array<{ language: string; code: string }> => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const blocks: Array<{ language: string; code: string }> = []
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    })
  }

  return blocks
}
