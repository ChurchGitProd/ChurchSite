/**
 * Resolves which lessons appear in the home page "Featured Bible Lessons"
 * section and the spotlight at the top of the Lessons page.
 * Slot/conflict logic lives in @/lib/featured; this maps lessons into card shape.
 */

import { parseDateValue, refTitle, resolveFeaturedSlots } from './featured';

export interface FeaturedLessonItem {
  slug: string;
  title: string;
  division?: string | null;
  reference?: string | null;
  teacher?: string | null;
  description?: string | null;
  readTime?: string | null;
  image?: string | null;
  pdfFile?: string | null;
}

export interface FeaturedLessonNode {
  _sys?: { filename?: string | null } | null;
  title?: string | null;
  division?: { title?: string | null } | string | null;
  book?: string | null;
  chapters?: string | null;
  teacher?: string | null;
  description?: string | null;
  readTime?: string | null;
  image?: string | null;
  pdfFile?: string | null;
  publishedDate?: string | null;
  featured?: string | null;
  featuredPosition?: string | null;
}

export function resolveFeaturedLessons(
  nodes: (FeaturedLessonNode | null | undefined)[] | null | undefined,
  limit = 3
): FeaturedLessonItem[] {
  const usable = (nodes ?? []).filter(
    (n): n is FeaturedLessonNode => Boolean(n?.title && n?._sys?.filename)
  );

  return resolveFeaturedSlots(usable, {
    limit,
    getTimestamp: (n) => parseDateValue(n.publishedDate),
    getKey: (n) => n.title ?? '',
  }).map((node) => ({
    slug: node._sys!.filename!,
    title: node.title!,
    division: refTitle(node.division),
    reference: [node.book, node.chapters].filter(Boolean).join(' ') || null,
    teacher: node.teacher,
    description: node.description,
    readTime: node.readTime,
    image: node.image,
    pdfFile: node.pdfFile,
  }));
}
