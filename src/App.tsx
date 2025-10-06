import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

// Simple loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DBAAS Chat
        </h1>
        <p className="text-gray-600 mb-8">
          Loading the chat interface...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
      </div>
    </div>
  )
}

// Chat interface with sidebar
function ChatInterface() {
  const [conversations, setConversations] = React.useState([
    {
      id: '1',
      title: 'How to build a React app',
      messages: [
        { id: '1', content: 'How do I create a new React application?', role: 'user' as const },
        { id: '2', content: 'To create a new React application, you can use Create React App or Vite...', role: 'assistant' as const }
      ],
      updatedAt: new Date(Date.now() - 3600000)
    },
    {
      id: '2', 
      title: 'Understanding TypeScript',
      messages: [
        { id: '3', content: 'What are TypeScript interfaces?', role: 'user' as const },
        { id: '4', content: 'TypeScript interfaces are a powerful way to define the structure of objects...', role: 'assistant' as const }
      ],
      updatedAt: new Date(Date.now() - 7200000)
    }
  ])
  
  const [currentConversationId, setCurrentConversationId] = React.useState('1')
  const [messages, setMessages] = React.useState(conversations[0].messages)
  const [input, setInput] = React.useState('')
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)

  // Apply dark mode to document
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const currentConversation = conversations.find(c => c.id === currentConversationId)

  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage = { id: Date.now().toString(), content: input, role: 'user' as const }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput('')
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId 
        ? { ...conv, messages: updatedMessages, updatedAt: new Date() }
        : conv
    ))
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        id: (Date.now() + 1).toString(), 
        content: 'This is a mock response from the DBAAS Chat frontend. The backend integration is ready to be implemented!', 
        role: 'assistant' as const 
      }
      const finalMessages = [...updatedMessages, aiResponse]
      setMessages(finalMessages)
      
      // Update conversation with AI response
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: finalMessages, updatedAt: new Date() }
          : conv
      ))
    }, 1000)
  }

  const handleNewConversation = () => {
    const newConv = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      updatedAt: new Date()
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentConversationId(newConv.id)
    setMessages([])
  }

  const handleSelectConversation = (id: string) => {
    const conv = conversations.find(c => c.id === id)
    if (conv) {
      setCurrentConversationId(id)
      setMessages(conv.messages)
      setSidebarOpen(false) // Close sidebar on mobile
    }
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (currentConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id)
      if (remaining.length > 0) {
        setCurrentConversationId(remaining[0].id)
        setMessages(remaining[0].messages)
      } else {
        handleNewConversation()
      }
    }
  }

  return (
    <div className={`h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-80' : 'w-0'
      } overflow-hidden`}>
        {/* Sidebar Header - with hamburger and new chat */}
        <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
          <div className="flex items-center gap-2 mb-2">
            {/* Hamburger/Close toggle inside sidebar */}
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition-colors duration-200`}
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* New conversation button */}
            <button
              onClick={handleNewConversation}
              className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200"
              aria-label="New conversation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">New Chat</span>
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start a new conversation to begin</p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group relative ${
                    currentConversationId === conversation.id
                      ? darkMode 
                        ? 'bg-primary-900/30 border border-primary-700' 
                        : 'bg-primary-50 border border-primary-200'
                      : darkMode
                        ? 'hover:bg-gray-700 border border-transparent hover:border-gray-600'
                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                >
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteConversation(conversation.id)
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Delete conversation"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {/* Conversation content */}
                  <div className="pr-8">
                    <h3 className={`font-medium text-sm truncate mb-1 ${
                      currentConversationId === conversation.id 
                        ? darkMode ? 'text-primary-300' : 'text-primary-900' 
                        : darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {conversation.title}
                    </h3>
                    <p className={`text-xs truncate mb-2 ${
                      currentConversationId === conversation.id 
                        ? darkMode ? 'text-primary-400' : 'text-primary-700' 
                        : darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {conversation.messages.length > 0 
                        ? conversation.messages[conversation.messages.length - 1].content.substring(0, 60) + '...'
                        : 'No messages yet'
                      }
                    </p>
                    <span className={`text-xs ${
                      currentConversationId === conversation.id 
                        ? darkMode ? 'text-primary-500' : 'text-primary-600' 
                        : darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {conversation.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            {/* Hamburger menu button - show when sidebar is closed */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200`}
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {/* App logo and title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <h1 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {currentConversation?.title || 'DBAAS Chat'}
              </h1>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Settings button */}
            <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Start a conversation</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Send a message to begin chatting with the AI assistant</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-100 border border-gray-600'
                        : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                darkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <React.Suspense fallback={<LoadingScreen />}>
        <ChatInterface />
      </React.Suspense>
    </ErrorBoundary>
  )
}

export default App
