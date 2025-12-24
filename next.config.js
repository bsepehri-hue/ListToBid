/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '/data/**',
        '/data/data/**',
        '/'
      ],
    };
    return config;
  },
};

export default nextConfig;
