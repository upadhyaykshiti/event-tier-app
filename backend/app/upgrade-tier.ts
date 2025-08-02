


import express, { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import { supabase } from '../lib/supabaseClient';

const router = express.Router();

// type Tier = 'free' | 'silver' | 'gold' | 'platinum';



router.post('/', async (req: Request, res: Response) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  const { tier } = req.body;

  console.log("➡️ Upgrade requested:", { userId, tier });

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!['free', 'silver', 'gold', 'platinum'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  try {
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: { tier },
      }),
    });

    const result = await clerkRes.json();
    console.log("✅ Clerk PATCH result:", result);

    if (!clerkRes.ok) {
      console.error("❌ Clerk PATCH failed:", clerkRes.status, result);
      return res.status(500).json({ error: 'Failed to update Clerk metadata' });
    }

    // Optionally sync to Supabase
    const { error: supabaseError } = await supabase
      .from('users')
      .upsert({ id: userId, tier });

    if (supabaseError) {
      console.error("❌ Supabase upsert error:", supabaseError.message);
      return res.status(500).json({ error: 'Failed to sync user tier' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk or Supabase update failed:", err);
    return res.status(500).json({ error: 'Failed to upgrade tier' });
  }
});


export default router;
