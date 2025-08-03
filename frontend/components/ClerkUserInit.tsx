

// frontend/components/ClerkUserInit.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ClerkUserInit() {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const setDefaultTier = async () => {
      if (isLoaded && user && !user.publicMetadata?.tier) {
        try {
          await user.update({
            // @ts-expect-error: publicMetadata is valid but not in type
            publicMetadata: { tier: 'free' },
          });
          console.log('✅ Tier set to free');
        } catch (err) {
          console.error('❌ Failed to set tier:', err);
        }
      }
    };

    setDefaultTier();
  }, [isLoaded, user]);

  return null;
}
