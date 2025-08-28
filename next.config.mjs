/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app', 'hb'],
  },
};

export default nextConfig;