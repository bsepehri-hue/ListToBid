/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚫 Skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: false, // ✅ Still catch real TypeScript errors
  },
};

export default nextConfig;
