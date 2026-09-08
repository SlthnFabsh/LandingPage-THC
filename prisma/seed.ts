import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { hash } from '@node-rs/argon2';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = 'admin@transhybrid.co.id';
  const adminPassword = 'Admin123!';

  // 1. Buat admin user
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await hash(adminPassword, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
      algorithm: 2,
    });

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin THC',
        role: 'ADMIN',
        passwordHash,
        passwordChangedAt: new Date(),
      },
    });
    console.log(`✓ Admin user dibuat: ${adminEmail}`);
    console.log(`  Password sementara: ${adminPassword}`);
    console.log(`  ⚠️ GANTI PASSWORD SEGERA SETELAH LOGIN PERTAMA!`);
  } else {
    console.log(`✓ Admin user sudah ada: ${adminEmail}`);
  }

  // 2. Seed berita awal
  const newsData = [
    {
      titleId: 'Trans Hybrid Communication Dukung Penguatan Digitalisasi Enterprise',
      titleEn: 'Trans Hybrid Communication Supports Enterprise Digitalization',
      summaryId: 'PT Trans Hybrid Communication terus berinovasi dalam memperkuat infrastruktur jaringan nasional guna mendorong efisiensi operasional sektor publik dan swasta...',
      summaryEn: 'PT Trans Hybrid Communication continues to innovate in strengthening the national network infrastructure to drive operational efficiency in public and private sectors...',
      contentId: null,
      contentEn: null,
      coverImage: '/assets/images/news-1.webp',
      date: new Date('2026-08-12T00:00:00.000Z'),
      slug: 'dukung-penguatan-digitalisasi-enterprise',
      published: true,
    },
    {
      titleId: 'PT. Trans Hybrid Communication (THC) Resmi Perluas Backbone Maritim',
      titleEn: 'PT. Trans Hybrid Communication (THC) Officially Expands Maritime Backbone',
      summaryId: 'Guna mendukung konektivitas wilayah pesisir & logistik nasional, THC meluncurkan jalur backbone fiber optik maritim berkapasitas tinggi di wilayah strategis...',
      summaryEn: 'To support coastal connectivity & national logistics, THC launched a high-capacity maritime fiber optic backbone route in strategic areas...',
      contentId: null,
      contentEn: null,
      coverImage: '/assets/images/news-2.webp',
      date: new Date('2026-07-18T00:00:00.000Z'),
      slug: 'perluas-backbone-maritim',
      published: true,
    },
    {
      titleId: 'PT. Trans Hybrid Communication Hadir di Seluruh Wilayah Jawa & Bali',
      titleEn: 'PT. Trans Hybrid Communication Now Available Across Java & Bali',
      summaryId: 'Memperluas jangkauan layanan di seluruh Jawa dan Bali, THC menghadirkan konektivitas andal bagi sektor korporasi, pemerintahan, dan UKM.',
      summaryEn: 'Expanding its service coverage across Java and Bali, THC delivers reliable connectivity for corporate, government, and SME sectors.',
      contentId: null,
      contentEn: null,
      coverImage: '/assets/images/news-3.webp',
      date: new Date('2026-05-05T00:00:00.000Z'),
      slug: 'hadir-di-seluruh-jawa-bali',
      published: true,
    },
    {
      titleId: 'THC Hadirkan Internet Gratis untuk Sekolah di Perbatasan Kalimantan Barat',
      titleEn: 'THC Provides Free Internet for Schools on the West Kalimantan Border',
      summaryId: 'THC meluncurkan program THCare, menyediakan layanan internet gratis dan perangkat telekomunikasi untuk sekolah-sekolah di wilayah perbatasan Kalimantan Barat.',
      summaryEn: 'THC launched the THCare program, providing free internet services and telecommunications equipment for schools in the West Kalimantan border region.',
      contentId: null,
      contentEn: null,
      coverImage: '/assets/images/news-4.webp',
      date: new Date('2025-05-15T00:00:00.000Z'),
      slug: 'internet-gratis-sekolah-perbatasan-kalbar',
      published: true,
    },
  ];

  const adminUser = existingAdmin || (await prisma.user.findUnique({ where: { email: adminEmail } }));

  for (const news of newsData) {
    const existing = await prisma.newsPost.findUnique({ where: { slug: news.slug } });
    if (!existing) {
      await prisma.newsPost.create({
        data: { ...news, authorId: adminUser!.id },
      });
      console.log(`✓ Berita ditambahkan: "${news.titleId}"`);
    } else {
      console.log(`✓ Berita sudah ada: "${news.titleId}"`);
    }
  }

  console.log('\nSeeding selesai!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
