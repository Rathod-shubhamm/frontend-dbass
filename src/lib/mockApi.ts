import { Message, Conversation, ChatMode, ApiResponse, SendMessageRequest, SendMessageResponse } from '@/types'
import { generateId, createMessage } from '@/utils/helpers'

// Mock data for initial conversations
const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'How to build a React app',
    messages: [
      {
        id: 'msg-1',
        content: 'How do I create a new React application?',
        role: 'user',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 'msg-2',
        content: 'To create a new React application, you can use Create React App or Vite. Here\'s how to get started with Vite:\n\n```bash\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev\n```\n\nThis will create a new React TypeScript project with Vite, which is faster and more modern than Create React App.',
        role: 'assistant',
        timestamp: new Date(Date.now() - 3500000),
      }
    ],
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3500000),
    mode: 'normal'
  },
  {
    id: 'conv-2',
    title: 'Understanding TypeScript interfaces',
    messages: [
      {
        id: 'msg-3',
        content: 'What are TypeScript interfaces and how do they work?',
        role: 'user',
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 'msg-4',
        content: 'TypeScript interfaces are a powerful way to define the structure of objects. They act as contracts that specify what properties and methods an object should have.\n\nHere\'s a basic example:\n\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  isActive?: boolean; // Optional property\n}\n\nconst user: User = {\n  id: 1,\n  name: "John Doe",\n  email: "john@example.com"\n};\n```\n\nInterfaces help catch errors at compile time and provide better IDE support.',
        role: 'assistant',
        timestamp: new Date(Date.now() - 7100000),
      }
    ],
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(Date.now() - 7100000),
    mode: 'normal'
  },
  {
    id: 'conv-3',
    title: 'CSS Grid vs Flexbox',
    messages: [
      {
        id: 'msg-5',
        content: 'When should I use CSS Grid vs Flexbox?',
        role: 'user',
        timestamp: new Date(Date.now() - 10800000),
      },
      {
        id: 'msg-6',
        content: 'CSS Grid and Flexbox serve different purposes:\n\n**Flexbox** is best for:\n- One-dimensional layouts (row OR column)\n- Aligning items within a container\n- Distributing space between items\n- Handling dynamic content sizes\n\n**CSS Grid** is best for:\n- Two-dimensional layouts (rows AND columns)\n- Complex page layouts\n- Precise positioning of elements\n- Creating responsive designs with minimal code\n\n**General rule**: Use Flexbox for components, Grid for layouts.',
        role: 'assistant',
        timestamp: new Date(Date.now() - 10700000),
      }
    ],
    createdAt: new Date(Date.now() - 10800000),
    updatedAt: new Date(Date.now() - 10700000),
    mode: 'research'
  }
]

// Mock AI responses based on different modes
const getMockResponse = (userMessage: string, mode: ChatMode): string => {
  const responses = {
    normal: [
      "That's an interesting question! Let me help you with that.",
      "I understand what you're asking. Here's what I think:",
      "Great question! Here's my perspective on this topic:",
      "I'd be happy to help you with that. Let me explain:",
      "That's a common question. Here's what you should know:"
    ],
    deepthink: [
      "Let me think deeply about this question and provide you with a comprehensive analysis:",
      "This is a complex topic that requires careful consideration. Here's my detailed analysis:",
      "I'll analyze this from multiple angles to give you a thorough understanding:",
      "Let me break this down systematically and explore all aspects:",
      "This deserves a deep dive. Here's my comprehensive response:"
    ],
    research: [
      "Let me research this topic thoroughly and provide you with detailed information:",
      "I'll gather comprehensive information about this subject for you:",
      "This requires extensive research. Here's what I've found:",
      "Let me provide you with a well-researched and detailed response:",
      "I'll give you a thorough, research-backed answer to your question:"
    ]
  }

  const modeResponses = responses[mode]
  const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)]
  
  // Add some context-aware responses
  if (userMessage.toLowerCase().includes('react')) {
    return `${randomResponse}\n\nReact is a powerful JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient rendering. Here are some key concepts:\n\n- **Components**: Reusable pieces of UI\n- **Props**: Data passed to components\n- **State**: Internal component data\n- **Hooks**: Functions that let you use state and lifecycle features\n- **JSX**: Syntax extension for JavaScript\n\nWould you like me to elaborate on any of these concepts?`
  }
  
  if (userMessage.toLowerCase().includes('typescript')) {
    return `${randomResponse}\n\nTypeScript is a strongly typed superset of JavaScript that adds static type checking. Here are its main benefits:\n\n- **Type Safety**: Catch errors at compile time\n- **Better IDE Support**: Enhanced autocomplete and refactoring\n- **Documentation**: Types serve as inline documentation\n- **Scalability**: Easier to maintain large codebases\n- **Modern Features**: Access to latest ECMAScript features\n\nTypeScript compiles to plain JavaScript and is widely used in modern web development.`
  }
  
  if (userMessage.toLowerCase().includes('css') || userMessage.toLowerCase().includes('styling')) {
    return `${randomResponse}\n\nCSS (Cascading Style Sheets) is the language used to style web pages. Here are some modern CSS techniques:\n\n- **Flexbox**: For one-dimensional layouts\n- **CSS Grid**: For two-dimensional layouts\n- **Custom Properties**: For dynamic theming\n- **CSS Modules**: For component-scoped styles\n- **PostCSS**: For CSS preprocessing and optimization\n\nModern CSS frameworks like Tailwind CSS provide utility classes for rapid development.`
  }
  
  // Default response
  return `${randomResponse}\n\nThis is a mock response from the DBAAS Chat frontend. In a real implementation, this would be replaced with actual AI responses from your backend API.\n\n**TODO**: Replace this mock response with actual API call to your backend service.\n\nFor now, this demonstrates the chat interface functionality with different response modes (Normal, DeepThink, Research).`
}

// Simulate API delay
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock API class for chat functionality
 * TODO: Replace with actual API calls when backend is ready
 */
export class MockApi {
  private conversations: Conversation[] = [...mockConversations]

  /**
   * Get all conversations
   * TODO: Replace with GET /api/conversations
   */
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    await delay(500) // Simulate network delay
    
    return {
      data: [...this.conversations],
      success: true,
      message: 'Conversations loaded successfully'
    }
  }

  /**
   * Get a specific conversation by ID
   * TODO: Replace with GET /api/conversations/:id
   */
  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    await delay(300)
    
    const conversation = this.conversations.find(conv => conv.id === id)
    
    if (!conversation) {
      return {
        data: null as any,
        success: false,
        message: 'Conversation not found'
      }
    }
    
    return {
      data: conversation,
      success: true,
      message: 'Conversation loaded successfully'
    }
  }

  /**
   * Send a message and get AI response
   * TODO: Replace with POST /api/chat/message
   */
  async sendMessage(request: SendMessageRequest): Promise<ApiResponse<SendMessageResponse>> {
    await delay(1000) // Simulate AI processing time
    
    const { message, conversationId, mode } = request
    
    // Create user message
    const userMessage = createMessage(message, 'user')
    
    // Find or create conversation
    let conversation = this.conversations.find(conv => conv.id === conversationId)
    
    if (!conversation) {
      // Create new conversation
      conversation = {
        id: generateId(),
        title: message.length > 50 ? message.substring(0, 50) + '...' : message,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        mode: mode || 'normal'
      }
      this.conversations.unshift(conversation)
    }
    
    // Add user message
    conversation.messages.push(userMessage)
    conversation.updatedAt = new Date()
    
    // Generate AI response
    const aiResponse = getMockResponse(message, mode || 'normal')
    const aiMessage = createMessage(aiResponse, 'assistant')
    
    // Add AI message
    conversation.messages.push(aiMessage)
    conversation.updatedAt = new Date()
    
    return {
      data: {
        message: aiMessage,
        conversationId: conversation.id
      },
      success: true,
      message: 'Message sent successfully'
    }
  }

  /**
   * Create a new conversation
   * TODO: Replace with POST /api/conversations
   */
  async createConversation(title?: string): Promise<ApiResponse<Conversation>> {
    await delay(300)
    
    const conversation: Conversation = {
      id: generateId(),
      title: title || 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      mode: 'normal'
    }
    
    this.conversations.unshift(conversation)
    
    return {
      data: conversation,
      success: true,
      message: 'Conversation created successfully'
    }
  }

  /**
   * Delete a conversation
   * TODO: Replace with DELETE /api/conversations/:id
   */
  async deleteConversation(id: string): Promise<ApiResponse<void>> {
    await delay(300)
    
    const index = this.conversations.findIndex(conv => conv.id === id)
    
    if (index === -1) {
      return {
        data: undefined,
        success: false,
        message: 'Conversation not found'
      }
    }
    
    this.conversations.splice(index, 1)
    
    return {
      data: undefined,
      success: true,
      message: 'Conversation deleted successfully'
    }
  }

  /**
   * Update conversation title
   * TODO: Replace with PUT /api/conversations/:id
   */
  async updateConversation(id: string, updates: Partial<Conversation>): Promise<ApiResponse<Conversation>> {
    await delay(300)
    
    const conversation = this.conversations.find(conv => conv.id === id)
    
    if (!conversation) {
      return {
        data: null as any,
        success: false,
        message: 'Conversation not found'
      }
    }
    
    Object.assign(conversation, updates)
    conversation.updatedAt = new Date()
    
    return {
      data: conversation,
      success: true,
      message: 'Conversation updated successfully'
    }
  }
}

// Export singleton instance
export const mockApi = new MockApi()

// Export types for use in components
export type { ApiResponse, SendMessageRequest, SendMessageResponse }
