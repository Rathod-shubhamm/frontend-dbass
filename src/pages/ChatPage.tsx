import React from 'react'
import { useChat } from '@/hooks/useChat'
import { useUI } from '@/contexts/UIContext'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { MessageInput } from '@/components/input/MessageInput'
import { cn } from '@/lib/utils'

/**
 * Main chat page component
 */
function ChatPage() {
  const { 
    currentConversation, 
    sendMessage, 
    createNewConversation,
    isChatBusy 
  } = useChat()
  
  const { sidebarOpen, isMobile } = useUI()

  // Create a new conversation if none exists
  React.useEffect(() => {
    if (!currentConversation) {
      createNewConversation()
    }
  }, [currentConversation, createNewConversation])

  const handleSendMessage = async (message: string, mode?: any) => {
    await sendMessage(message, mode)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat area */}
        <div className={cn(
          'flex-1 flex flex-col',
          isMobile && !sidebarOpen ? 'w-full' : 'w-0'
        )}>
          {/* Chat window */}
          <ChatWindow className="flex-1" />

          {/* Message input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={isChatBusy}
            placeholder="Type your message..."
            showModeButtons={true}
          />
        </div>
      </div>
    </div>
  )
}
