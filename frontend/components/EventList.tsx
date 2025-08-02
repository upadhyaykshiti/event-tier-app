



'use client';

import React from 'react';
import type { Event , Tier} from '@/types';

type Props = {
  events: Event[];
  userTier: 'free' | 'silver' | 'gold' | 'platinum';
};

const tierPriority = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};

const tierColors = {
  free: 'bg-green-100 text-green-800',
  silver: 'bg-gray-200 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
};

const tiers: Tier[] = ['free', 'silver', 'gold', 'platinum'];




export default function EventList({ events, userTier }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const userTierIndex = tiers.indexOf(userTier);
        const eventTierIndex = tiers.indexOf(event.tier); // assumes event.tier is of type Tier
        const locked = userTierIndex < eventTierIndex;

        return (
          <div
            key={event.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${
              locked ? 'opacity-60 pointer-events-none' : ''
            }`}
          >
            <div
              className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
              style={{
                backgroundImage: `url(${event.image_url || '/placeholder.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!event.image_url && 'No image available'}
            </div>

            <div className="p-4 flex flex-col gap-2 flex-grow">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-xs text-gray-500">
                {new Intl.DateTimeFormat('en-GB').format(new Date(event.event_date))}
              </p>

              <span className={`text-xs font-bold w-fit px-2 py-1 rounded-full ${tierColors[event.tier]}`}>
                {event.tier.toUpperCase()}
              </span>

              {locked && (
                <p className="mt-2 text-red-600 text-sm font-medium">
                  🔒 Upgrade to <strong>{event.tier}</strong> to access this event.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
