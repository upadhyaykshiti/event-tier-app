

'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';

export default function Navbar() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-4 py-3 shadow bg-white">
      <div className="text-xl font-bold">🚀 My App</div>
      <div className="space-x-2">
        <SignedIn>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </SignedIn>

        <SignedOut>
        
<SignInButton mode="redirect" forceRedirectUrl="/events">
  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    Sign In
  </button>
</SignInButton>


<SignUpButton mode="redirect" forceRedirectUrl="/events">
  <button className="bg-gray-600 text-white px-4 py-2 rounded">
    Sign Up
  </button>
</SignUpButton>


        </SignedOut>
      </div>
    </nav>
  );
}

