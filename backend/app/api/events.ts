




// backend/app/api/events.ts

import express from 'express';
import { getAuth } from '@clerk/express';
import { supabase } from '../../lib/supabaseClient';
import { clerkClient } from '@clerk/clerk-sdk-node';


const router = express.Router();



router.get('/', async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    const userTier = (clerkUser.publicMetadata?.tier as string) || 'free';
    console.log('🔍 Fetching events for user:', userId, 'with tier:', userTier);

    const tierOrder = ['free', 'silver', 'gold', 'platinum'];
    const allowedTiers = tierOrder.slice(0, tierOrder.indexOf(userTier) + 1);

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .in('tier', allowedTiers);

    if (error) {
      console.error('❌ Supabase error:', error.message);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }

    return res.status(200).json({ events, userTier });
  } catch (err: any) {
    console.error('❌ Clerk fetch error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch user tier' });
  }
});


export default router;
