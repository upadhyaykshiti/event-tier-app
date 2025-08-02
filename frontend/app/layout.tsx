// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import ClerkUserInit from '@/components/ClerkUserInit';

const inter = Inter({ subsets: ['latin'] });

// console.log('🔐 In layout CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY);



export default function RootLayout({ children }: { children: ReactNode }) {
   return (
<ClerkProvider
  afterSignInUrl="/events"
  afterSignUpUrl="/events"
>
  <html lang="en">
    <body className={inter.className}>
      <ClerkUserInit />
      <Navbar />
      <div className="min-h-screen bg-gray-50">{children}</div>
    </body>
  </html>
</ClerkProvider>
 );
}
