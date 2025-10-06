# Component Organization

This document explains how components are organized and structured in the DBAAS Chat frontend project.

## Component Hierarchy

### App Structure
```
App
├── UIProvider
│   └── ChatProvider
│       └── ChatPage
│           ├── Header
│           ├── Sidebar
│           │   └── ConversationList
│           │       └── ConversationItem
│           ├── ChatWindow
│           │   └── MessageList
│           │       └── ChatMessage
│           └── MessageInput
│               └── ModeButtons
```

## Component Categories

### 1. Layout Components
Components that define the overall structure and layout of the application.

#### Header (`src/components/layout/Header.tsx`)
- **Purpose**: Application header with branding and navigation
- **Props**: `className?: string`
- **Features**:
  - App branding and logo
  - Navigation menu
  - Theme toggle
  - Language switcher
  - Mobile menu button

#### Sidebar (`src/components/layout/Sidebar.tsx`)
- **Purpose**: Conversation history sidebar
- **Props**: `className?: string`
- **Features**:
  - Conversation list
  - New conversation button
  - Search functionality
  - Mobile responsive behavior

#### ConversationItem (`src/components/layout/ConversationItem.tsx`)
- **Purpose**: Individual conversation item in sidebar
- **Props**: 
  - `conversation: Conversation`
  - `isActive?: boolean`
  - `onSelect?: (id: string) => void`
  - `onDelete?: (id: string) => void`
- **Features**:
  - Conversation preview
  - Timestamp display
  - Mode indicator
  - Delete functionality

### 2. Chat Components
Components specifically for chat functionality.

#### ChatWindow (`src/components/chat/ChatWindow.tsx`)
- **Purpose**: Main chat interface container
- **Props**: `className?: string`
- **Features**:
  - Chat header with conversation info
  - Message list container
  - Loading and error states
  - Empty state handling

#### ChatMessage (`src/components/chat/ChatMessage.tsx`)
- **Purpose**: Individual chat message display
- **Props**:
  - `message: Message`
  - `isLast?: boolean`
  - `className?: string`
- **Features**:
  - User and AI message styling
  - Timestamp display
  - Message actions (copy, regenerate)
  - Avatar display

#### MessageList (`src/components/chat/MessageList.tsx`)
- **Purpose**: Scrollable container for messages
- **Props**:
  - `messages: Message[]`
  - `isTyping?: boolean`
  - `className?: string`
  - `autoScroll?: boolean`
- **Features**:
  - Auto-scroll to bottom
  - Message grouping
  - Typing indicator
  - Empty state

#### TypingIndicator (`src/components/chat/TypingIndicator.tsx`)
- **Purpose**: Shows when AI is typing
- **Props**:
  - `className?: string`
  - `isVisible?: boolean`
- **Features**:
  - Animated dots
  - AI avatar
  - Conditional rendering

### 3. Input Components
Components for user input and interaction.

#### MessageInput (`src/components/input/MessageInput.tsx`)
- **Purpose**: Text input with send functionality
- **Props**:
  - `onSendMessage: (message: string, mode?: ChatMode) => void`
  - `isLoading?: boolean`
  - `placeholder?: string`
  - `className?: string`
  - `maxLength?: number`
  - `showModeButtons?: boolean`
  - `defaultMode?: ChatMode`
- **Features**:
  - Auto-resizing textarea
  - Character count
  - Send button with loading state
  - Keyboard shortcuts
  - Mode selection

#### ModeButtons (`src/components/input/ModeButtons.tsx`)
- **Purpose**: Chat mode selection buttons
- **Props**:
  - `selectedMode: ChatMode`
  - `onModeChange: (mode: ChatMode) => void`
  - `className?: string`
  - `disabled?: boolean`
- **Features**:
  - Three modes: Normal, DeepThink, Research
  - Visual mode indicators
  - Tooltips with descriptions
  - Disabled state handling

### 4. UI Components
Generic, reusable UI components.

#### Loader (`src/components/ui/Loader.tsx`)
- **Purpose**: Loading indicators
- **Props**:
  - `size?: 'sm' | 'md' | 'lg'`
  - `color?: 'primary' | 'white' | 'gray'`
  - `className?: string`
- **Features**:
  - Multiple sizes and colors
  - Spinner animation
  - Accessibility support

#### LanguageSwitcher (`src/components/ui/LanguageSwitcher.tsx`)
- **Purpose**: Language selection component
- **Props**:
  - `className?: string`
  - `showLabel?: boolean`
- **Features**:
  - English/Hebrew toggle
  - Flag display
  - Native language names
  - Dropdown variant

## Component Patterns

### 1. Container vs Presentational Components

#### Container Components
- Manage state and logic
- Connect to contexts and services
- Handle data fetching and mutations
- Examples: `ChatPage`, `ChatWindow`

#### Presentational Components
- Focus on UI rendering
- Receive data via props
- Minimal internal state
- Examples: `ChatMessage`, `Loader`

### 2. Compound Components
Components that work together to provide complex functionality.

#### MessageInput + ModeButtons
```typescript
<MessageInput
  onSendMessage={handleSend}
  showModeButtons={true}
  defaultMode="normal"
>
  <ModeButtons
    selectedMode={selectedMode}
    onModeChange={setSelectedMode}
  />
</MessageInput>
```

#### Sidebar + ConversationList + ConversationItem
```typescript
<Sidebar>
  <ConversationList
    conversations={conversations}
    currentConversationId={currentId}
    onConversationSelect={handleSelect}
    onConversationDelete={handleDelete}
  >
    {conversations.map(conv => (
      <ConversationItem
        key={conv.id}
        conversation={conv}
        isActive={conv.id === currentId}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    ))}
  </ConversationList>
</Sidebar>
```

### 3. Render Props Pattern
Components that accept functions as children for flexible rendering.

#### Example: Conditional Rendering
```typescript
<ConditionalRender
  condition={isLoading}
  render={() => <Loader />}
  fallback={() => <ChatContent />}
/>
```

### 4. Higher-Order Components (HOCs)
Functions that take a component and return a new component with additional functionality.

#### Example: withLoading
```typescript
const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & { isLoading?: boolean }) => {
    if (props.isLoading) {
      return <Loader />
    }
    return <Component {...props} />
  }
}
```

## Component Communication

### 1. Props Down, Events Up
- Parent components pass data down via props
- Child components communicate up via callback functions
- Maintains unidirectional data flow

### 2. Context for Shared State
- Use React Context for state shared across multiple components
- Avoid prop drilling
- Keep context focused and minimal

### 3. Custom Hooks for Logic
- Extract component logic into custom hooks
- Reuse logic across multiple components
- Keep components focused on rendering

## Styling Patterns

### 1. Tailwind CSS Classes
- Use utility classes for styling
- Consistent spacing and colors
- Responsive design utilities

### 2. Component-Specific Classes
- Define component classes in `index.css`
- Use CSS-in-JS for dynamic styling
- Maintain design system consistency

### 3. Conditional Styling
```typescript
const buttonClasses = cn(
  'px-4 py-2 rounded-lg transition-colors',
  variant === 'primary' 
    ? 'bg-primary-500 text-white hover:bg-primary-600'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  disabled && 'opacity-50 cursor-not-allowed'
)
```

## Component Testing

### 1. Unit Testing
- Test individual components in isolation
- Mock dependencies and props
- Test different prop combinations

### 2. Integration Testing
- Test component interactions
- Test with real contexts and services
- Test user workflows

### 3. Visual Testing
- Test component appearance
- Test responsive behavior
- Test different states

## Performance Optimization

### 1. React.memo
- Memoize components that receive stable props
- Prevent unnecessary re-renders
- Use for expensive components

### 2. useMemo and useCallback
- Memoize expensive calculations
- Memoize callback functions
- Prevent unnecessary recalculations

### 3. Code Splitting
- Lazy load components
- Split code by route or feature
- Reduce initial bundle size

## Accessibility

### 1. Semantic HTML
- Use appropriate HTML elements
- Maintain proper heading hierarchy
- Use landmarks and regions

### 2. ARIA Attributes
- Add ARIA labels and descriptions
- Use ARIA states and properties
- Ensure keyboard navigation

### 3. Focus Management
- Manage focus for modals and dropdowns
- Provide visible focus indicators
- Support keyboard navigation

## Component Documentation

### 1. JSDoc Comments
```typescript
/**
 * Chat message component that displays individual messages
 * @param message - The message object to display
 * @param isLast - Whether this is the last message in the conversation
 * @param className - Additional CSS classes
 */
export function ChatMessage({ message, isLast, className }: ChatMessageProps) {
  // Component implementation
}
```

### 2. Storybook Stories
- Document component usage
- Show different states and variations
- Provide interactive examples

### 3. TypeScript Types
- Define clear prop interfaces
- Use generic types where appropriate
- Export types for reuse

## Best Practices

### 1. Component Design
- Keep components small and focused
- Use composition over inheritance
- Follow single responsibility principle

### 2. Props Design
- Use descriptive prop names
- Provide default values where appropriate
- Use TypeScript for type safety

### 3. State Management
- Minimize component state
- Lift state up when needed
- Use context for shared state

### 4. Error Handling
- Handle error states gracefully
- Provide fallback UI
- Log errors appropriately

### 5. Performance
- Optimize re-renders
- Use appropriate memoization
- Profile and measure performance

This organization ensures that components are maintainable, reusable, and follow React best practices while providing a clear structure for the development team.
