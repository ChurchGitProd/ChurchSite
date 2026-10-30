/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'uxmagic.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      },
    ],
  },
}

module.exports = nextConfig
