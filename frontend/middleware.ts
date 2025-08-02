

// frontend/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  afterSignInUrl: '/events',
  afterSignUpUrl: '/events',
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], 
};
