

'use client';

import React, { useEffect, useState } from 'react';
import EventList from '@/components/EventList';
import type { Event } from '@/types';
import { useUser, useAuth } from '@clerk/nextjs';
import UpgradeTierButton from '@/components/UpgradeButton'; 

type ApiResponse = {
  events: Event[];
  userTier: 'free' | 'silver' | 'gold' | 'platinum';
};

export default function ServerEventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userTier, setUserTier] = useState<'free' | 'silver' | 'gold' | 'platinum'>('free');
  const [loading, setLoading] = useState(true);
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();

  const fetchEvents = async () => {
    if (!isLoaded || !user) return;

    const userMetadataTier = user.publicMetadata?.tier as 'free' | 'silver' | 'gold' | 'platinum' | undefined;

    if (!userMetadataTier) {
      console.warn("⚠️ No tier found, skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status}`);
      }

      const data: ApiResponse = await res.json();
      setEvents(data.events);
      setUserTier(data.userTier);
    } catch (err) {
      console.error('❌ Event fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [isLoaded, user, getToken]);

  if (!isLoaded || loading) {
    return <p className="p-4 text-center">Loading events...</p>;
  }

  return (
    <div className="space-y-4">
      {/* 🟡 Notice for non-platinum users */}
      {userTier !== 'platinum' && (
        <div className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-lg border border-yellow-300 text-center">
          You're on the <strong>{userTier}</strong> tier. Upgrade to unlock more events!
        </div>
      )}

      <UpgradeTierButton onUpgrade={fetchEvents} />

      <EventList events={events} userTier={userTier} />
    </div>
  );
}
