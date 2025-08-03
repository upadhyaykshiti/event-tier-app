

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ServerEventList from '../events/ServerEventList';
// import UpgradeTierButton from '../../components/UpgradeButton';
import type { Tier } from '@/types';


export default async function EventsPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

    // const tier = ((sessionClaims?.publicMetadata as { tier?: Tier })?.tier) ?? 'free';


  return (
    <div className="container px-4 py-10 mx-auto">
       
      <ServerEventList />

    </div>
  );
}

