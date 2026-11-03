import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SCRIPTURA Digital Library',
    short_name: 'SCRIPTURA',
    description:
      'Exploring the Sacred Texts with Scholarly Precision & Reverence — lessons, books, magazines, images, and video lectures.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#163B6C',
    icons: [],
  };
}
