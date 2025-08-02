// lib/supabase/server.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerClient = () => {
  return createRouteHandlerClient({ cookies });
};