import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jesus Loves Ministry Digital Library',
    short_name: 'Jesus Loves Ministry',
    description:
      'Exploring the Sacred Texts with Scholarly Precision & Reverence — lessons, books, images, and video lectures.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#163B6C',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
