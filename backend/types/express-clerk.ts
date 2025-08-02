// backend/types/express-clerk.ts

import 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
        getToken?: (tokenName?: string) => Promise<string | null>;
      };
    }
  }
}
