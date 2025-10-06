# DBAAS Chat Frontend

A modern, responsive chat interface built with React, TypeScript, and Tailwind CSS, designed to work with AI chat backends.

## Features

- 🚀 **Modern Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- 💬 **Chat Interface**: ChatGPT-like UI with message bubbles and typing indicators
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🌐 **Internationalization**: Support for English and Hebrew
- 🎨 **Theme Support**: Light and dark mode
- 💾 **Local Storage**: Persistent conversation history
- 🔧 **Mock API**: Ready-to-use mock API for development
- 📦 **Modular Architecture**: Clean, maintainable code structure

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dbaas-chat-frontend

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build
# or
bun build

# Preview the build
npm run preview
# or
yarn preview
# or
bun preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── chat/           # Chat-specific components
│   ├── input/          # Input components
│   ├── layout/         # Layout components
│   └── ui/             # Generic UI components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization
├── lib/                # Utility libraries
├── pages/              # Page components
├── services/           # API and storage services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Components

### Chat Components
- `ChatWindow`: Main chat interface
- `ChatMessage`: Individual message component
- `MessageList`: Scrollable message list
- `TypingIndicator`: Shows when AI is typing

### Input Components
- `MessageInput`: Text input with send button
- `ModeButtons`: Chat mode selection (Normal, DeepThink, Research)

### Layout Components
- `Header`: App header with navigation
- `Sidebar`: Conversation history sidebar
- `ConversationItem`: Individual conversation in sidebar

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=DBAAS Chat
VITE_APP_VERSION=1.0.0
```

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration in `tailwind.config.js`:

- Custom color palette
- Extended animations
- Responsive breakpoints
- Component classes

## API Integration

### Mock API

The project includes a mock API (`src/lib/mockApi.ts`) for development:

```typescript
import { mockApi } from '@/lib/mockApi'

// Get conversations
const conversations = await mockApi.getConversations()

// Send a message
const response = await mockApi.sendMessage({
  message: "Hello, world!",
  conversationId: "conv-123",
  mode: "normal"
})
```

### Real API Integration

To integrate with a real backend, replace the mock API calls in `src/services/api.ts`:

```typescript
// TODO: Replace with actual HTTP requests
const response = await fetch(`${API_ENDPOINTS.BASE_URL}/chat/message`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request)
})
```

## State Management

The application uses React Context for state management:

- `ChatContext`: Manages chat state, conversations, and messages
- `UIContext`: Manages UI state, theme, language, and sidebar

### Usage

```typescript
import { useChat } from '@/hooks/useChat'
import { useUI } from '@/contexts/UIContext'

function MyComponent() {
  const { sendMessage, currentConversation } = useChat()
  const { theme, setTheme } = useUI()
  
  // Use the state and functions
}
```

## Internationalization

The project supports multiple languages using react-i18next:

### Adding a New Language

1. Create a new directory in `src/i18n/locales/`
2. Add translation files (common.json, chat.json, sidebar.json)
3. Update `src/i18n/config.ts`

### Using Translations

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation('common')
  
  return <h1>{t('app.name')}</h1>
}
```

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling. Key features:

- Responsive design utilities
- Custom color palette
- Component classes
- Dark mode support

### Custom Classes

```css
.chat-message {
  @apply max-w-[80%] rounded-lg px-4 py-2 shadow-sm;
}

.chat-message.user {
  @apply bg-primary-500 text-white ml-auto;
}

.chat-message.assistant {
  @apply bg-white text-gray-900 border border-gray-200;
}
```

## Development

### Code Style

- ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting (recommended)

### Testing

```bash
# Run tests
npm test
# or
yarn test
# or
bun test
```

### Linting

```bash
# Run linter
npm run lint
# or
yarn lint
# or
bun run lint
```

## Deployment

### Static Hosting

The built application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Build Output

The build process creates a `dist` directory with optimized assets:

- Minified JavaScript
- Optimized CSS
- Compressed images
- Source maps (in development)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

## Roadmap

- [ ] Voice input support
- [ ] File upload functionality
- [ ] Message search
- [ ] Export conversations
- [ ] PWA support
- [ ] Offline mode
- [ ] Real-time collaboration
- [ ] Plugin system
