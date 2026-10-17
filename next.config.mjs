/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.lhr.life',
    '*.loca.lt',
    'fmkal-studio-preview.loca.lt',
    '*.trycloudflare.com',
    '*.ngrok-free.app',
    'localhost:3000',
  ],
};

export default nextConfig;

