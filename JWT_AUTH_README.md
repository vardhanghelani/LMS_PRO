# JWT Authentication System

This document describes the JWT token-based authentication system implemented in the Library Management System.

## Overview

The authentication system has been updated from cookie-based authentication to JWT token-based authentication for better security and scalability.

## Key Changes Made

### 1. JWT Utilities (`app/utils/jwt.ts`)
- `generateToken()`: Creates JWT tokens with user information
- `verifyToken()`: Verifies and decodes JWT tokens
- `extractTokenFromHeader()`: Extracts token from Authorization header

### 2. Authentication Middleware (`app/utils/authMiddleware.ts`)
- `withAuth()`: Protects routes requiring authentication
- `withRoleAuth()`: Protects routes requiring specific roles
- Provides user information to route handlers

### 3. Updated API Routes

#### Login (`app/api/auth/login/route.tsx`)
- Generates JWT token on successful login
- Sets token as httpOnly cookie
- Returns token in response body

#### Register (`app/api/auth/register/route.tsx`)
- Generates JWT token on successful registration
- Sets token as httpOnly cookie
- Returns token in response body

#### Check User (`app/api/auth/check-user/route.tsx`)
- Verifies JWT token from Authorization header
- Returns user information if token is valid
- Changed from POST to GET method

#### Logout (`app/api/auth/logout/route.tsx`)
- Clears JWT token cookie
- Returns success message

### 4. Updated Middleware (`middleware.ts`)
- Verifies JWT tokens for protected routes
- Handles invalid/expired tokens
- Redirects users based on their role

### 5. Client Utilities (`app/utils/authClient.ts`)
- `login()`: Handles login requests
- `register()`: Handles registration requests
- `logout()`: Handles logout requests
- `getCurrentUser()`: Fetches current user information
- `makeAuthenticatedRequest()`: Makes authenticated API calls

## Usage Examples

### Protecting API Routes

```typescript
import { withRoleAuth } from '@/app/utils/authMiddleware';

// Route accessible only to librarians
export const GET = withRoleAuth(['librarian'])(async (req) => {
    const userId = req.user!.userId; // User info from JWT
    // Your route logic here
});

// Route accessible to multiple roles
export const POST = withRoleAuth(['librarian', 'admin'])(async (req) => {
    const userRole = req.user!.role;
    // Your route logic here
});
```

### Client-Side Authentication

```typescript
import { login, getCurrentUser, makeAuthenticatedRequest } from '@/app/utils/authClient';

// Login
const { user, token } = await login(email, password, role);

// Get current user
const currentUser = await getCurrentUser();

// Make authenticated request
const response = await makeAuthenticatedRequest('/api/protected-route', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

## Environment Variables

Add the following to your `.env` file:

```env
JWT_SECRET=your-secure-secret-key-here
```

**Important**: Use a strong, unique secret key in production.

## Security Features

1. **HttpOnly Cookies**: JWT tokens are stored as httpOnly cookies to prevent XSS attacks
2. **Secure Cookies**: Cookies are marked as secure in production
3. **SameSite**: Cookies use strict sameSite policy
4. **Token Expiration**: Tokens expire after 24 hours
5. **Role-Based Access**: Routes can be protected by specific roles
6. **Automatic Token Verification**: Middleware automatically verifies tokens

## Migration Notes

- Old cookie-based authentication has been replaced
- `userId` and `userRole` cookies are no longer used
- New `authToken` cookie contains the JWT token
- API routes now use middleware for authentication
- Client-side code should use the new auth utilities

## Testing

1. Register a new user
2. Login with credentials
3. Access protected routes
4. Verify role-based access control
5. Test logout functionality

## Troubleshooting

- **401 Unauthorized**: Check if JWT token is valid and not expired
- **403 Forbidden**: Verify user has the required role
- **Token not found**: Ensure login/register was successful
- **Invalid token**: Token may be expired or malformed 