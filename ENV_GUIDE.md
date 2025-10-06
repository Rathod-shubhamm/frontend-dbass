# Environment Configuration Guide

This guide explains how to configure environment variables and settings for the DBAAS Chat frontend application.

## Environment Variables

### Overview

Environment variables in Vite (the build tool used by this project) are prefixed with `VITE_` and are available in the browser. This means they should not contain sensitive information.

### Configuration Files

#### 1. `.env` (Default)
Contains default environment variables for all environments.

#### 2. `.env.local` (Local Development)
Contains local development overrides. This file is ignored by git.

#### 3. `.env.development` (Development)
Contains development-specific variables.

#### 4. `.env.production` (Production)
Contains production-specific variables.

#### 5. `.env.staging` (Staging)
Contains staging-specific variables.

## Available Environment Variables

### Application Configuration

```env
# Application name
VITE_APP_NAME=DBAAS Chat

# Application version
VITE_APP_VERSION=1.0.0

# Application description
VITE_APP_DESCRIPTION=AI-powered chat interface

# Application URL
VITE_APP_URL=https://chat.dbaas.com
```

### API Configuration

```env
# API base URL
VITE_API_BASE_URL=http://localhost:8000/api

# API timeout in milliseconds
VITE_API_TIMEOUT=30000

# API version
VITE_API_VERSION=v1

# Enable API debugging
VITE_API_DEBUG=true
```

### Feature Flags

```env
# Enable voice input
VITE_FEATURE_VOICE_INPUT=false

# Enable file upload
VITE_FEATURE_FILE_UPLOAD=false

# Enable markdown rendering
VITE_FEATURE_MARKDOWN=true

# Enable code highlighting
VITE_FEATURE_CODE_HIGHLIGHTING=true

# Enable export functionality
VITE_FEATURE_EXPORT=false

# Enable sharing functionality
VITE_FEATURE_SHARING=false
```

### UI Configuration

```env
# Default theme
VITE_DEFAULT_THEME=light

# Default language
VITE_DEFAULT_LANGUAGE=en

# Enable animations
VITE_ENABLE_ANIMATIONS=true

# Sidebar width
VITE_SIDEBAR_WIDTH=280

# Header height
VITE_HEADER_HEIGHT=64
```

### Chat Configuration

```env
# Maximum message length
VITE_MAX_MESSAGE_LENGTH=4000

# Maximum conversations
VITE_MAX_CONVERSATIONS=50

# Auto-save interval in milliseconds
VITE_AUTO_SAVE_INTERVAL=5000

# Typing indicator delay
VITE_TYPING_DELAY=1000
```

### Storage Configuration

```env
# Storage prefix
VITE_STORAGE_PREFIX=dbaas_chat

# Enable storage encryption
VITE_STORAGE_ENCRYPTION=false

# Storage version
VITE_STORAGE_VERSION=1
```

### Analytics Configuration

```env
# Google Analytics ID
VITE_GA_ID=

# Enable analytics
VITE_ANALYTICS_ENABLED=false

# Analytics endpoint
VITE_ANALYTICS_ENDPOINT=https://analytics.dbaas.com
```

### Error Tracking

```env
# Sentry DSN
VITE_SENTRY_DSN=

# Enable error tracking
VITE_ERROR_TRACKING_ENABLED=false

# Error tracking environment
VITE_ERROR_TRACKING_ENV=development
```

## Environment-Specific Configurations

### Development Environment

Create a `.env.development` file:

```env
# Development API
VITE_API_BASE_URL=http://localhost:8000/api

# Enable debugging
VITE_API_DEBUG=true
VITE_ANALYTICS_ENABLED=false
VITE_ERROR_TRACKING_ENABLED=false

# Development features
VITE_FEATURE_VOICE_INPUT=true
VITE_FEATURE_FILE_UPLOAD=true

# Development theme
VITE_DEFAULT_THEME=light
```

### Staging Environment

Create a `.env.staging` file:

```env
# Staging API
VITE_API_BASE_URL=https://api-staging.dbaas.com

# Staging features
VITE_FEATURE_VOICE_INPUT=false
VITE_FEATURE_FILE_UPLOAD=true

# Enable analytics
VITE_ANALYTICS_ENABLED=true
VITE_GA_ID=GA-STAGING-ID

# Error tracking
VITE_ERROR_TRACKING_ENABLED=true
VITE_ERROR_TRACKING_ENV=staging
```

### Production Environment

Create a `.env.production` file:

```env
# Production API
VITE_API_BASE_URL=https://api.dbaas.com

# Production features
VITE_FEATURE_VOICE_INPUT=false
VITE_FEATURE_FILE_UPLOAD=false

# Production analytics
VITE_ANALYTICS_ENABLED=true
VITE_GA_ID=GA-PRODUCTION-ID

# Production error tracking
VITE_ERROR_TRACKING_ENABLED=true
VITE_ERROR_TRACKING_ENV=production
```

## Using Environment Variables

### In React Components

```typescript
// Access environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const appName = import.meta.env.VITE_APP_NAME
const isDevelopment = import.meta.env.DEV

// Use in component
function MyComponent() {
  useEffect(() => {
    if (import.meta.env.VITE_API_DEBUG) {
      console.log('API Debug mode enabled')
    }
  }, [])

  return (
    <div>
      <h1>{import.meta.env.VITE_APP_NAME}</h1>
    </div>
  )
}
```

### In Configuration Files

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(import.meta.env.VITE_PORT) || 3000,
    host: import.meta.env.VITE_HOST || 'localhost'
  },
  build: {
    outDir: 'dist',
    sourcemap: import.meta.env.VITE_SOURCEMAP === 'true'
  }
})
```

### In TypeScript Types

```typescript
// types/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_DEFAULT_THEME: 'light' | 'dark'
  readonly VITE_DEFAULT_LANGUAGE: 'en' | 'he'
  readonly VITE_FEATURE_VOICE_INPUT: string
  readonly VITE_FEATURE_FILE_UPLOAD: string
  readonly VITE_ANALYTICS_ENABLED: string
  readonly VITE_ERROR_TRACKING_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Configuration Management

### Configuration Service

Create a configuration service to centralize environment variable access:

```typescript
// services/config.ts
class ConfigService {
  private static instance: ConfigService

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  get apiBaseUrl(): string {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  }

  get appName(): string {
    return import.meta.env.VITE_APP_NAME || 'DBAAS Chat'
  }

  get appVersion(): string {
    return import.meta.env.VITE_APP_VERSION || '1.0.0'
  }

  get defaultTheme(): 'light' | 'dark' {
    return (import.meta.env.VITE_DEFAULT_THEME as 'light' | 'dark') || 'light'
  }

  get defaultLanguage(): 'en' | 'he' {
    return (import.meta.env.VITE_DEFAULT_LANGUAGE as 'en' | 'he') || 'en'
  }

  get isDevelopment(): boolean {
    return import.meta.env.DEV
  }

  get isProduction(): boolean {
    return import.meta.env.PROD
  }

  get featureFlags() {
    return {
      voiceInput: import.meta.env.VITE_FEATURE_VOICE_INPUT === 'true',
      fileUpload: import.meta.env.VITE_FEATURE_FILE_UPLOAD === 'true',
      markdown: import.meta.env.VITE_FEATURE_MARKDOWN === 'true',
      codeHighlighting: import.meta.env.VITE_FEATURE_CODE_HIGHLIGHTING === 'true',
      export: import.meta.env.VITE_FEATURE_EXPORT === 'true',
      sharing: import.meta.env.VITE_FEATURE_SHARING === 'true'
    }
  }

  get analytics() {
    return {
      enabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
      gaId: import.meta.env.VITE_GA_ID || '',
      endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || ''
    }
  }

  get errorTracking() {
    return {
      enabled: import.meta.env.VITE_ERROR_TRACKING_ENABLED === 'true',
      dsn: import.meta.env.VITE_SENTRY_DSN || '',
      environment: import.meta.env.VITE_ERROR_TRACKING_ENV || 'development'
    }
  }
}

export const config = ConfigService.getInstance()
```

### Using the Configuration Service

```typescript
// In components
import { config } from '@/services/config'

function MyComponent() {
  const { apiBaseUrl, appName, featureFlags } = config

  return (
    <div>
      <h1>{appName}</h1>
      {featureFlags.voiceInput && <VoiceInput />}
    </div>
  )
}
```

## Build-Time Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: env.VITE_HOST || 'localhost'
    },
    build: {
      outDir: 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true'
    }
  }
})
```

### TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Security Considerations

### What NOT to Put in Environment Variables

- API keys
- Database credentials
- Private keys
- Secrets
- Passwords

### What TO Put in Environment Variables

- Public API endpoints
- Feature flags
- UI configuration
- Build settings
- Public identifiers

### Best Practices

1. **Prefix with VITE_**: All browser-accessible variables must be prefixed
2. **Use .env.local**: For local development secrets (not committed to git)
3. **Validate values**: Check that required variables are present
4. **Provide defaults**: Always provide fallback values
5. **Document variables**: Keep this guide updated with new variables

## Deployment Configuration

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Build with environment variables
ARG VITE_API_BASE_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      args:
        VITE_API_BASE_URL: http://localhost:8000/api
        VITE_APP_NAME: DBAAS Chat
        VITE_APP_VERSION: 1.0.0
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### Kubernetes

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dbaas-chat-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dbaas-chat-frontend
  template:
    metadata:
      labels:
        app: dbaas-chat-frontend
    spec:
      containers:
      - name: frontend
        image: dbaas-chat-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: VITE_API_BASE_URL
          value: "https://api.dbaas.com"
        - name: VITE_APP_NAME
          value: "DBAAS Chat"
        - name: VITE_APP_VERSION
          value: "1.0.0"
```

## Troubleshooting

### Common Issues

1. **Variable not accessible**: Ensure it's prefixed with `VITE_`
2. **Undefined values**: Check that the variable is defined in the correct environment file
3. **Build errors**: Verify variable names and values
4. **Type errors**: Update TypeScript definitions

### Debugging

```typescript
// Debug environment variables
console.log('Environment:', import.meta.env)
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)
console.log('Feature Flags:', config.featureFlags)
```

### Validation

```typescript
// Validate required environment variables
function validateEnvironment() {
  const required = [
    'VITE_API_BASE_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION'
  ]

  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Call during app initialization
validateEnvironment()
```

This guide provides comprehensive information about configuring and managing environment variables in the DBAAS Chat frontend application.
