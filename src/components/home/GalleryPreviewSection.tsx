import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sanitizeImageUrl } from '@/lib/media';

interface GalleryItem {
  title?: string | null;
  category?: string | null;
  image?: string | null;
}

interface GalleryPreviewData {
  sectionTitle?: string | null;
  items?: (GalleryItem | null)[] | null;
}

interface GalleryPreviewSectionProps {
  data?: GalleryPreviewData | null;
}

export default function GalleryPreviewSection({ data }: GalleryPreviewSectionProps) {
  const sectionTitle = data?.sectionTitle || 'Bible Image Gallery Preview';

  const defaultItems: GalleryItem[] = [
    {
      title: 'Ancient Pentateuch Manuscript',
      category: 'Historical Artifact',
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/hero_bible-1782719363350-90sctq9ygv4.png',
    },
    {
      title: 'Classic Leather-Bound Archives',
      category: 'Library Collection',
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/library_shelf-1782719371570-ajnz70oz8sg.png',
    },
    {
      title: 'Greek Scripture Annotations',
      category: 'Scholarly Study',
      image:
        'https://uxmagic.blob.core.windows.net/public/agent-images/study_scene-1782719380163-v1e6si6wd9.png',
    },
    {
      title: 'The Southern Steps of Jerusalem',
      category: 'Archaeology',
      image: '/uploads/The Southern Steps of Jerusalem.jpg',
    },
    {
      title: 'The Great Isaiah Scroll Replica',
      category: 'Manuscript',
      image: '/uploads/The Great Isaiah Scroll Replica.png',
    },
    {
      title: 'Greek Codex Transcription Annotations',
      category: 'Scribal Study',
      image: '/uploads/Greek Codex Transcription Annotations.jpg',
    },
  ];

  const items =
    data?.items && data.items.length > 0
      ? (data.items.filter(Boolean) as GalleryItem[])
      : defaultItems;

  return (
    <section
      id="images"
      className="space-y-6 py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-6 lg:rounded-xl border border-border/50"
      style={{ background: '#F4FBFC' }}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <span className="w-1.5 h-6 bg-tertiary rounded"></span>
          {sectionTitle}
        </h2>
        <Link
          href="/images"
          className="text-xs font-semibold text-tertiary hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View Full Gallery</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href="/images"
            className="group relative rounded-lg overflow-hidden border border-border bg-card shadow-sm aspect-square block"
          >
            <img
              src={sanitizeImageUrl(item.image || defaultItems[idx]?.image || '')}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              alt={item.title || 'Gallery preview'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-xs font-heading font-bold text-primary-foreground">
                {item.title}
              </p>
              {item.category && (
                <p className="text-[10px] text-tertiary">{item.category}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
