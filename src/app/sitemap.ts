import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { getServicePageSlugs, serviceHref } from '@/lib/service-content';
import { servicePagesSeed } from '@/lib/service-seed-data';

type RouteEntry = {
  path: string;
  name: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

/** Rute non-layanan. Halaman /layanan diambil dari database, lihat di bawah. */
export const publicRoutes: RouteEntry[] = [
  { path: '/', name: 'Home', priority: 1, changeFrequency: 'weekly' },
  // Jaringan
  { path: '/jaringan', name: 'Jaringan', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/jaringan/coverage', name: 'Cakupan Jaringan', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/jaringan/global-network', name: 'Jaringan Global', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/jaringan/hub-pop', name: 'Hub & PoP', priority: 0.7, changeFrequency: 'monthly' },
  // Layanan
  { path: '/layanan', name: 'Layanan', priority: 0.9, changeFrequency: 'monthly' },
  // Tentang
  { path: '/tentang', name: 'Tentang', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/tentang/informasi-perusahaan', name: 'Informasi Perusahaan', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tentang/nilai-inti', name: 'Nilai Inti', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tentang/struktur-grup', name: 'Struktur Grup', priority: 0.8, changeFrequency: 'monthly' },
];

export const staticLastModified = new Date('2026-09-14');

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: staticLastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const slugs = await getServicePageSlugs();
  const activeSlugs = slugs.length > 0 ? slugs : servicePagesSeed.map((page) => page.slug);

  const serviceEntries: MetadataRoute.Sitemap = activeSlugs.map((slug) => ({
    url: `${siteUrl}${serviceHref(slug)}`,
    lastModified: staticLastModified,
    changeFrequency: 'monthly',
    priority: slug.includes('/') ? 0.8 : 0.85,
  }));

  return [...staticEntries, ...serviceEntries];
}
