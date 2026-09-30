import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: '2026-09-30', changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: '2026-09-30', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/archive`, lastModified: '2026-09-30', changeFrequency: 'monthly', priority: 0.8 },
  ];
}
