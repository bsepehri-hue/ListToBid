/** @type {import('next').NextConfig} */
const nextConfig = {
  onDemandEntries: {
    // Prevent Next.js from scanning parent directories
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Reduce filesystem watching without touching Webpack
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;