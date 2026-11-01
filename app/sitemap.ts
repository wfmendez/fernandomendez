import type { MetadataRoute } from 'next';
import { cases } from '@/data/cases';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // The home and archive pages change whenever a logbook does.
  const latest = cases.map(c => c.updated).sort().at(-1);
  return [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: '2026-09-30', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/archive`, lastModified: latest, changeFrequency: 'monthly', priority: 0.8 },
    ...cases.map(c => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified: c.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
