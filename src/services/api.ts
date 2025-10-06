import { ApiResponse, SendMessageRequest, SendMessageResponse, Conversation } from '@/types'
import { mockApi } from '@/lib/mockApi'
import { API_ENDPOINTS } from '@/utils/constants'

/**
 * API service for handling all backend communications
 * TODO: Replace mockApi calls with actual HTTP requests when backend is ready
 */
export class ApiService {
  private baseUrl: string
  private timeout: number

  constructor(baseUrl: string = API_ENDPOINTS.BASE_URL, timeout: number = 30000) {
    this.baseUrl = baseUrl
    this.timeout = timeout
  }

  /**
   * Generic HTTP request method
   * TODO: Implement actual HTTP client (fetch, axios, etc.)
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // For now, use mock API
    // TODO: Replace with actual HTTP request
    console.log(`API Request: ${options.method || 'GET'} ${endpoint}`)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Return mock response
    throw new Error('Real API not implemented yet - using mock API')
  }

  /**
   * Get all conversations
   * TODO: Replace with GET /api/conversations
   */
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<Conversation[]>(API_ENDPOINTS.GET_CONVERSATIONS)
      // return response
      
      // Using mock API for now
      return await mockApi.getConversations()
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
      return {
        data: [],
        success: false,
        message: 'Failed to load conversations'
      }
    }
  }

  /**
   * Get a specific conversation by ID
   * TODO: Replace with GET /api/conversations/:id
   */
  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<Conversation>(`${API_ENDPOINTS.GET_CONVERSATION}/${id}`)
      // return response
      
      // Using mock API for now
      return await mockApi.getConversation(id)
    } catch (error) {
      console.error('Failed to fetch conversation:', error)
      return {
        data: null as any,
        success: false,
        message: 'Failed to load conversation'
      }
    }
  }

  /**
   * Send a message and get AI response
   * TODO: Replace with POST /api/chat/message
   */
  async sendMessage(request: SendMessageRequest): Promise<ApiResponse<SendMessageResponse>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<SendMessageResponse>(
      //   API_ENDPOINTS.SEND_MESSAGE,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(request)
      //   }
      // )
      // return response
      
      // Using mock API for now
      return await mockApi.sendMessage(request)
    } catch (error) {
      console.error('Failed to send message:', error)
      return {
        data: null as any,
        success: false,
        message: 'Failed to send message'
      }
    }
  }

  /**
   * Create a new conversation
   * TODO: Replace with POST /api/conversations
   */
  async createConversation(title?: string): Promise<ApiResponse<Conversation>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<Conversation>(
      //   API_ENDPOINTS.GET_CONVERSATIONS,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ title })
      //   }
      // )
      // return response
      
      // Using mock API for now
      return await mockApi.createConversation(title)
    } catch (error) {
      console.error('Failed to create conversation:', error)
      return {
        data: null as any,
        success: false,
        message: 'Failed to create conversation'
      }
    }
  }

  /**
   * Delete a conversation
   * TODO: Replace with DELETE /api/conversations/:id
   */
  async deleteConversation(id: string): Promise<ApiResponse<void>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<void>(
      //   `${API_ENDPOINTS.DELETE_CONVERSATION}/${id}`,
      //   {
      //     method: 'DELETE'
      //   }
      // )
      // return response
      
      // Using mock API for now
      return await mockApi.deleteConversation(id)
    } catch (error) {
      console.error('Failed to delete conversation:', error)
      return {
        data: undefined,
        success: false,
        message: 'Failed to delete conversation'
      }
    }
  }

  /**
   * Update conversation
   * TODO: Replace with PUT /api/conversations/:id
   */
  async updateConversation(id: string, updates: Partial<Conversation>): Promise<ApiResponse<Conversation>> {
    try {
      // TODO: Replace with actual API call
      // const response = await this.request<Conversation>(
      //   `${API_ENDPOINTS.UPDATE_CONVERSATION}/${id}`,
      //   {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(updates)
      //   }
      // )
      // return response
      
      // Using mock API for now
      return await mockApi.updateConversation(id, updates)
    } catch (error) {
      console.error('Failed to update conversation:', error)
      return {
        data: null as any,
        success: false,
        message: 'Failed to update conversation'
      }
    }
  }

  /**
   * Health check endpoint
   * TODO: Implement health check
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    try {
      // TODO: Replace with actual health check
      // const response = await this.request<{ status: string; timestamp: string }>('/health')
      // return response
      
      // Mock health check
      return {
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString()
        },
        success: true,
        message: 'Service is healthy'
      }
    } catch (error) {
      console.error('Health check failed:', error)
      return {
        data: null as any,
        success: false,
        message: 'Health check failed'
      }
    }
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Export types
export type { ApiResponse, SendMessageRequest, SendMessageResponse }
