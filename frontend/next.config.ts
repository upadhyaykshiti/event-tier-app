// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// next.config.js


module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, 
  },
  rewrites: async () => [
    {
      source: '/sign-in',
      destination: '/sign-in',
    },
    {
      source: '/sign-up',
      destination: '/sign-up',
    },
  ],
  env: {
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/events',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/events',
  },
};

