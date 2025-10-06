# Getting Started with DBAAS Chat Frontend

This guide will help you get up and running with the DBAAS Chat frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **bun**
- **Git** - [Download here](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dbaas-chat-frontend
```

### 2. Install Dependencies

Choose one of the following package managers:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using bun:**
```bash
bun install
```

### 3. Start the Development Server

**Using npm:**
```bash
npm run dev
```

**Using yarn:**
```bash
yarn dev
```

**Using bun:**
```bash
bun dev
```

The application will start on `http://localhost:3000` by default.

## First Steps

### 1. Explore the Interface

Once the application is running, you'll see:

- **Header**: App branding and navigation
- **Sidebar**: Conversation history (initially empty)
- **Chat Area**: Main conversation interface
- **Input Area**: Message input with mode selection

### 2. Start Your First Conversation

1. Click the "+" button in the sidebar to create a new conversation
2. Type a message in the input area
3. Select a chat mode (Normal, DeepThink, or Research)
4. Press Enter or click the send button

### 3. Try Different Features

- **Mode Selection**: Try different chat modes to see varied responses
- **Sidebar**: Navigate between conversations
- **Settings**: Access settings via the header
- **Theme**: Toggle between light and dark mode
- **Language**: Switch between English and Hebrew

## Understanding the Mock API

The application uses a mock API for development. Here's what you need to know:

### Mock Responses

The mock API provides realistic responses based on:
- **Normal Mode**: Standard conversational responses
- **DeepThink Mode**: More thoughtful, analytical responses
- **Research Mode**: Comprehensive, research-focused responses

### Response Patterns

The mock API recognizes certain keywords:
- **React**: Provides React.js information
- **TypeScript**: Provides TypeScript information
- **CSS**: Provides CSS and styling information

### API Structure

```typescript
// Send a message
const response = await mockApi.sendMessage({
  message: "Your message here",
  conversationId: "optional-conversation-id",
  mode: "normal" | "deepthink" | "research"
})

// Get conversations
const conversations = await mockApi.getConversations()
```

## Development Workflow

### 1. Making Changes

The application uses hot module replacement, so changes will appear immediately in the browser.

### 2. Code Structure

- **Components**: Located in `src/components/`
- **Pages**: Located in `src/pages/`
- **Hooks**: Located in `src/hooks/`
- **Services**: Located in `src/services/`
- **Types**: Located in `src/types/`

### 3. Adding New Features

1. Create components in the appropriate directory
2. Add TypeScript types if needed
3. Update the mock API if required
4. Test your changes

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=DBAAS Chat
VITE_APP_VERSION=1.0.0
```

### Tailwind Configuration

The project uses Tailwind CSS. Key configuration files:

- `tailwind.config.js`: Tailwind configuration
- `postcss.config.js`: PostCSS configuration
- `src/index.css`: Global styles and Tailwind imports

## Building for Production

### 1. Build the Application

**Using npm:**
```bash
npm run build
```

**Using yarn:**
```bash
yarn build
```

**Using bun:**
```bash
bun build
```

### 2. Preview the Build

**Using npm:**
```bash
npm run preview
```

**Using yarn:**
```bash
yarn preview
```

**Using bun:**
```bash
bun preview
```

The built application will be available in the `dist` directory.

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

**2. Dependencies Not Installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**4. Build Failures**
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Review the terminal output
3. Check the documentation
4. Create an issue in the repository

## Next Steps

### 1. Customize the Interface

- Modify colors in `tailwind.config.js`
- Update component styles
- Add new UI components

### 2. Integrate with Real API

- Replace mock API calls in `src/services/api.ts`
- Update API endpoints
- Handle authentication

### 3. Add New Features

- Implement file uploads
- Add voice input
- Create message search
- Add conversation export

### 4. Deploy

- Choose a hosting platform
- Configure environment variables
- Set up CI/CD pipeline

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## Support

For additional help:

- Check the README.md file
- Review the project documentation
- Create an issue in the repository
- Join the community discussions
