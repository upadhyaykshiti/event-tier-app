// backend/server.ts

import 'dotenv/config'; // 👈 MUST come first
import express from 'express';
import cors from 'cors';
import { clerkMiddleware, getAuth } from '@clerk/express';

import eventsRouter from './app/api/events';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clerkMiddleware());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
  const auth = getAuth(req);
  if (auth?.userId) {
    (req as any).userId = auth.userId;
  }
  next();
});

// Debug logs
console.log("🔑 CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
console.log("🔑 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

// Mount routers
app.use('/api/events', eventsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
