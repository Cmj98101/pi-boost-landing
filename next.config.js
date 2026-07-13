/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: '/buy',
        destination: '/pricing',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
