export interface NewsFallback {
  id: string;
  titleId: string;
  titleEn: string;
  summaryId: string;
  summaryEn: string;
  contentId: string | null;
  contentEn: string | null;
  coverImage: string;
  date: string; // ISO
  slug: string;
  anim: string;
}

// Data awal berita yang dipakai sebagai fallback (ketika DB belum tersedia)
// dan sebagai seed awal ke database.
export const newsFallback: NewsFallback[] = [
  {
    id: 'seed-news-1',
    titleId: 'Trans Hybrid Communication Dukung Penguatan Digitalisasi Enterprise',
    titleEn: 'Trans Hybrid Communication Supports Enterprise Digitalization',
    summaryId:
      'PT Trans Hybrid Communication terus berinovasi dalam memperkuat infrastruktur jaringan nasional guna mendorong efisiensi operasional sektor publik dan swasta...',
    summaryEn:
      'PT Trans Hybrid Communication continues to innovate in strengthening the national network infrastructure to drive operational efficiency in public and private sectors...',
    contentId: null,
    contentEn: null,
    coverImage: '/assets/images/news-1.webp',
    date: '2026-08-12',
    slug: 'dukung-penguatan-digitalisasi-enterprise',
    anim: 'fade-up delay-100',
  },
  {
    id: 'seed-news-2',
    titleId: 'PT. Trans Hybrid Communication (THC) Resmi Perluas Backbone Maritim',
    titleEn: 'PT. Trans Hybrid Communication (THC) Officially Expands Maritime Backbone',
    summaryId:
      'Guna mendukung konektivitas wilayah pesisir & logistik nasional, THC meluncurkan jalur backbone fiber optik maritim berkapasitas tinggi di wilayah strategis...',
    summaryEn:
      'To support coastal connectivity & national logistics, THC launched a high-capacity maritime fiber optic backbone route in strategic areas...',
    contentId: null,
    contentEn: null,
    coverImage: '/assets/images/news-2.webp',
    date: '2026-07-18',
    slug: 'perluas-backbone-maritim',
    anim: 'fade-up delay-200',
  },
  {
    id: 'seed-news-3',
    titleId: 'PT. Trans Hybrid Communication Hadir di Seluruh Wilayah Jawa & Bali',
    titleEn: 'PT. Trans Hybrid Communication Now Available Across Java & Bali',
    summaryId:
      'Memperluas jangkauan layanan di seluruh Jawa dan Bali, THC menghadirkan konektivitas andal bagi sektor korporasi, pemerintahan, dan UKM.',
    summaryEn:
      'Expanding its service coverage across Java and Bali, THC delivers reliable connectivity for corporate, government, and SME sectors.',
    contentId: null,
    contentEn: null,
    coverImage: '/assets/images/news-3.webp',
    date: '2026-05-05',
    slug: 'hadir-di-seluruh-jawa-bali',
    anim: 'fade-up delay-300',
  },
  {
    id: 'seed-news-4',
    titleId: 'THC Hadirkan Internet Gratis untuk Sekolah di Perbatasan Kalimantan Barat',
    titleEn: 'THC Provides Free Internet for Schools on the West Kalimantan Border',
    summaryId:
      'THC meluncurkan program THCare, menyediakan layanan internet gratis dan perangkat telekomunikasi untuk sekolah-sekolah di wilayah perbatasan Kalimantan Barat.',
    summaryEn:
      'THC launched the THCare program, providing free internet services and telecommunications equipment for schools in the West Kalimantan border region.',
    contentId: null,
    contentEn: null,
    coverImage: '/assets/images/news-4.webp',
    date: '2025-05-15',
    slug: 'internet-gratis-sekolah-perbatasan-kalbar',
    anim: 'fade-up delay-400',
  },
];
