import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

type RouteEntry = {
  path: string;
  name: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export const publicRoutes: RouteEntry[] = [
  { path: '/', name: 'Home', priority: 1, changeFrequency: 'weekly' },
  // Jaringan
  { path: '/jaringan', name: 'Jaringan', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/jaringan/coverage', name: 'Cakupan Jaringan', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/jaringan/global-network', name: 'Jaringan Global', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/jaringan/hub-pop', name: 'Hub & PoP', priority: 0.7, changeFrequency: 'monthly' },
  // Layanan
  { path: '/layanan', name: 'Layanan', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/layanan/internet', name: 'Layanan Internet', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/layanan/internet/dedicated-internet', name: 'Dedicated Internet', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/layanan/internet/ip-transit', name: 'IP Transit', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/internet/thc-ix', name: 'THC-IX', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/konektivitas', name: 'Layanan Konektivitas', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/layanan/konektivitas/idcb', name: 'IDCB', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/konektivitas/iepl', name: 'IEPL', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/konektivitas/iplc', name: 'IPLC', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/konektivitas/metro-ethernet', name: 'Metro Ethernet', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/pusat-data', name: 'Layanan Pusat Data', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/layanan/pusat-data/colocation', name: 'Colocation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/pusat-data/thc-cloud', name: 'THC Cloud', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/solusi', name: 'Layanan Solusi', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/layanan/solusi/layanan-terkelola', name: 'Layanan Terkelola', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/layanan/solusi/layanan-terkelola/managed-cpe', name: 'Managed CPE', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/layanan/solusi/layanan-terkelola/managed-wifi', name: 'Managed WiFi', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/layanan/solusi/solusi-terkelola', name: 'Solusi Terkelola', priority: 0.8, changeFrequency: 'monthly' },
  {
    path: '/layanan/solusi/solusi-terkelola/education-solutions',
    name: 'Edukasi Solusi',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/layanan/solusi/solusi-terkelola/hospitality-solutions',
    name: 'Hospitality Solusi',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  // Tentang
  { path: '/tentang', name: 'Tentang', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/tentang/informasi-perusahaan', name: 'Informasi Perusahaan', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tentang/nilai-inti', name: 'Nilai Inti', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tentang/struktur-grup', name: 'Struktur Grup', priority: 0.8, changeFrequency: 'monthly' },
];

export const staticLastModified = new Date('2026-09-14');

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${siteUrl}${route.path}`,
      lastModified: staticLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
    return entry;
  });
}
