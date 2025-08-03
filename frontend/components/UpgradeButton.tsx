

'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const TIERS = ['free', 'silver', 'gold', 'platinum'] as const;

type Props = {
  onUpgrade?: (newTier: string) => void; // ✅ optional callback
};

export default function UpgradeTierButton({ onUpgrade }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const currentTier = (user?.publicMetadata?.tier as typeof TIERS[number]) || 'free';
  const currentIndex = TIERS.indexOf(currentTier);
  const nextTier = TIERS[currentIndex + 1];

  if (currentTier === 'platinum' || !nextTier) return null;

  const upgradeTier = async () => {
    try {
      setLoading(true);

      const res = await fetch('http://localhost:3001/upgrade-tier', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: nextTier }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("❌ Upgrade failed:", err);
        throw new Error('Upgrade failed');
      }

      console.log("✅ Upgrade successful");

      // 🔁 Reload Clerk user metadata
      await user?.reload();

      // ✅ Inform parent to refresh events immediately
      onUpgrade?.(nextTier);

      // Optional: force refresh page if needed
      router.refresh();
    } catch (err) {
      console.error('❌ Upgrade error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={upgradeTier}
      disabled={loading}
      className="mt-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Upgrading...' : `Upgrade to ${nextTier}`}
    </button>
  );
}
