# Project Structure

This document explains the organization and structure of the DBAAS Chat frontend project.

## Overview

The project follows a modular, component-based architecture with clear separation of concerns. Each directory has a specific purpose and contains related functionality.

## Root Directory

```
dbaas-chat-frontend/
├── 📄 Configuration Files
├── 📁 public/                 # Static assets
├── 📁 src/                   # Source code
└── 📄 Documentation
```

## Configuration Files

### Package Management
- `package.json` - Project dependencies and scripts
- `package-lock.json` - npm lock file (if using npm)
- `bun.lock` - Bun lock file (if using bun)

### Build & Development
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - TypeScript config for Node.js tools
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

### Type Definitions
- `vite-env.d.ts` - Vite environment type definitions

## Public Directory

```
public/
└── logo.svg                   # Application logo
```

Contains static assets that are served directly without processing.

## Source Directory (`src/`)

### Entry Points
```
src/
├── main.tsx                   # Application entry point
├── App.tsx                    # Root component
└── index.css                  # Global styles
```

### Components (`src/components/`)

Organized by feature and functionality:

```
components/
├── 📁 chat/                   # Chat-specific components
│   ├── ChatWindow.tsx         # Main chat interface
│   ├── ChatMessage.tsx        # Individual message component
│   ├── MessageList.tsx        # Scrollable message list
│   └── TypingIndicator.tsx    # AI typing animation
│
├── 📁 input/                  # Input components
│   ├── MessageInput.tsx       # Text input with send button
│   └── ModeButtons.tsx        # Chat mode selection
│
├── 📁 layout/                 # Layout components
│   ├── Header.tsx             # Application header
│   ├── Sidebar.tsx            # Conversation sidebar
│   └── ConversationItem.tsx   # Sidebar conversation item
│
└── 📁 ui/                     # Generic UI components
    ├── Loader.tsx             # Loading indicators
    └── LanguageSwitcher.tsx   # Language selection
```

### Contexts (`src/contexts/`)

React Context providers for state management:

```
contexts/
├── ChatContext.tsx            # Chat state management
└── UIContext.tsx              # UI state management
```

### Hooks (`src/hooks/`)

Custom React hooks:

```
hooks/
├── useChat.ts                 # Enhanced chat functionality
└── useDeviceDetection.ts      # Device and responsive utilities
```

### Internationalization (`src/i18n/`)

Multi-language support:

```
i18n/
├── config.ts                  # i18n configuration
└── 📁 locales/               # Translation files
    ├── 📁 en/                # English translations
    │   ├── common.json       # Common translations
    │   ├── chat.json         # Chat-specific translations
    │   └── sidebar.json      # Sidebar translations
    └── 📁 he/                # Hebrew translations
        ├── common.json       # Common translations
        ├── chat.json         # Chat-specific translations
        └── sidebar.json      # Sidebar translations
```

### Libraries (`src/lib/`)

Utility libraries and configurations:

```
lib/
├── mockApi.ts                 # Mock API implementation
└── utils.ts                   # Utility functions
```

### Pages (`src/pages/`)

Main page components:

```
pages/
├── ChatPage.tsx               # Main chat page
└── SettingsPage.tsx           # Settings page
```

### Services (`src/services/`)

External service integrations:

```
services/
├── api.ts                     # API service layer
└── storage.ts                 # Local storage service
```

### Types (`src/types/`)

TypeScript type definitions:

```
types/
└── index.ts                   # All type definitions
```

### Utils (`src/utils/`)

Utility functions and constants:

```
utils/
├── constants.ts               # Application constants
└── helpers.ts                 # Helper functions
```

### Assets (`src/assets/`)

Static assets processed by Vite:

```
assets/
└── avatars/                   # Avatar images
```

## File Naming Conventions

### Components
- **PascalCase**: `ChatWindow.tsx`, `MessageInput.tsx`
- **Descriptive**: Names should clearly indicate purpose
- **Consistent**: Similar components follow the same pattern

### Utilities
- **camelCase**: `mockApi.ts`, `utils.ts`
- **Descriptive**: Names should indicate functionality
- **Grouped**: Related utilities in the same file

### Types
- **PascalCase**: `ChatState`, `Message`, `Conversation`
- **Descriptive**: Names should clearly indicate what they represent
- **Grouped**: Related types in the same file

## Import/Export Patterns

### Default Exports
Used for main components and pages:
```typescript
// Component
export default function ChatWindow() { ... }

// Page
export default function ChatPage() { ... }
```

### Named Exports
Used for utilities, hooks, and multiple exports:
```typescript
// Hooks
export function useChat() { ... }
export function useDeviceDetection() { ... }

// Utilities
export const generateId = () => { ... }
export const formatTimestamp = (date: Date) => { ... }
```

### Barrel Exports
Used for organizing related exports:
```typescript
// types/index.ts
export type { Message, Conversation, ChatState } from './types'
export type { UIState } from './ui'
```

## Component Architecture

### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { ComponentProps } from '@/types'

// 2. Interface definition
interface ComponentProps {
  // props definition
}

// 3. Component implementation
export function Component({ prop1, prop2 }: ComponentProps) {
  // component logic
  return (
    // JSX
  )
}

// 4. Default export
export default Component
```

### Hook Structure
```typescript
// 1. Imports
import { useState, useEffect } from 'react'

// 2. Hook implementation
export function useCustomHook() {
  // hook logic
  return {
    // returned values
  }
}
```

## State Management

### Context Pattern
```typescript
// 1. Create context
const Context = createContext<ContextType | undefined>(undefined)

// 2. Provider component
export function Provider({ children }: Props) {
  // state and logic
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

// 3. Custom hook
export function useContext() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useContext must be used within Provider')
  }
  return context
}
```

## Styling Approach

### Tailwind CSS
- **Utility-first**: Use Tailwind classes for styling
- **Responsive**: Mobile-first responsive design
- **Custom**: Extend Tailwind with custom classes
- **Consistent**: Follow design system patterns

### CSS Classes
```typescript
// Component classes
.chat-message {
  @apply max-w-[80%] rounded-lg px-4 py-2 shadow-sm;
}

// Utility classes
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200;
}
```

## API Integration

### Service Layer
```typescript
// 1. API service
export class ApiService {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    // API call implementation
  }
}

// 2. Mock implementation
export class MockApi {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    // Mock implementation
  }
}
```

## Testing Structure

### Test Files
```
__tests__/
├── components/
│   ├── ChatWindow.test.tsx
│   └── MessageInput.test.tsx
├── hooks/
│   ├── useChat.test.ts
│   └── useDeviceDetection.test.ts
└── utils/
    ├── helpers.test.ts
    └── constants.test.ts
```

## Build Output

### Distribution
```
dist/
├── assets/
│   ├── index-[hash].js        # Main JavaScript bundle
│   ├── index-[hash].css       # Main CSS bundle
│   └── [other assets]         # Other processed assets
├── index.html                 # Main HTML file
└── [other files]              # Other static files
```

## Development Workflow

### 1. Feature Development
1. Create feature branch
2. Implement components
3. Add types
4. Update tests
5. Submit PR

### 2. Component Development
1. Define interface
2. Implement component
3. Add styling
4. Test functionality
5. Document usage

### 3. API Integration
1. Define types
2. Implement service
3. Add error handling
4. Test integration
5. Update documentation

## Best Practices

### Code Organization
- **Single Responsibility**: Each file has one clear purpose
- **Logical Grouping**: Related functionality grouped together
- **Clear Naming**: Names clearly indicate purpose
- **Consistent Structure**: Follow established patterns

### Component Design
- **Composable**: Components can be combined easily
- **Reusable**: Components work in different contexts
- **Testable**: Components are easy to test
- **Accessible**: Components follow accessibility guidelines

### State Management
- **Minimal State**: Keep state as minimal as possible
- **Predictable**: State changes are predictable
- **Local First**: Use local state when possible
- **Context When Needed**: Use context for shared state

### Performance
- **Lazy Loading**: Load components when needed
- **Memoization**: Use React.memo and useMemo appropriately
- **Code Splitting**: Split code for better loading
- **Optimization**: Optimize images and assets

This structure provides a solid foundation for building and maintaining a scalable React application.
