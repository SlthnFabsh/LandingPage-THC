import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from '../src/lib/mariadb-conn';
import { hash } from '@node-rs/argon2';
import { translations, translate } from '../src/lib/i18n';

const connectionString = process.env.DATABASE_URL as string;
const config = mariadbPoolConfigFromUrl(connectionString);
const adapter = config ? new PrismaMariaDb(config) : new PrismaMariaDb(connectionString);
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

  console.log('\n--- Seeding konten situs ---');

  // 3. Profil perusahaan (single row)
  await prisma.companyContent.upsert({
    where: { id: 'company' },
    update: {},
    create: {
      id: 'company',
      titleId: translations.id.company.title,
      titleEn: translations.en.company.title,
      p1Id: translations.id.company.p1,
      p1En: translations.en.company.p1,
      p2Id: translations.id.company.p2,
      p2En: translations.en.company.p2,
      homeImage: '/assets/images/borneo.webp',
      introId: translations.id.about.intro,
      introEn: translations.en.about.intro,
      visiId: translations.id.about.visi,
      visiEn: translations.en.about.visi,
      misiId: translations.id.about.misi.join('\n'),
      misiEn: translations.en.about.misi.join('\n'),
      licensesId: translations.id.about.licenses,
      licensesEn: translations.en.about.licenses,
    },
  });
  console.log('✓ Profil perusahaan: company');

  // 4. Statistik
  const statValues = [50, 100, 19, 1, 500];
  const statSuffixes = ['RB+', '+', 'Thn+', 'RB+', '+'];
  const statLabelKeys = [
    'company.statPelanggan',
    'company.statPop',
    'company.statOperasi',
    'company.statKabel',
    'company.statTrafik',
  ];
  for (let i = 0; i < statValues.length; i++) {
    const existing = await prisma.companyStat.findFirst({ where: { order: i + 1 } });
    if (!existing) {
      await prisma.companyStat.create({
        data: {
          companyId: 'company',
          order: i + 1,
          value: statValues[i],
          suffix: statSuffixes[i],
          labelId: translate('id', statLabelKeys[i]),
          labelEn: translate('en', statLabelKeys[i]),
        },
      });
      console.log(`✓ Statistik #${i + 1}`);
    }
  }

  // 5. Layanan
  const serviceKeys: { icon: string; iconColor: string; titleKey: string; descKey: string }[] = [
    { icon: 'wifi', iconColor: 'text-violet-600', titleKey: 'services.internet', descKey: 'services.internet.desc' },
    { icon: 'network', iconColor: 'text-emerald-500', titleKey: 'services.konektivitas', descKey: 'services.konektivitas.desc' },
    { icon: 'cpu', iconColor: 'text-yellow-400', titleKey: 'services.solusi', descKey: 'services.solusi.desc' },
    { icon: 'database', iconColor: 'text-red-500', titleKey: 'services.data', descKey: 'services.data.desc' },
  ];
  for (let i = 0; i < serviceKeys.length; i++) {
    const item = serviceKeys[i];
    const existing = await prisma.serviceItem.findFirst({ where: { order: i + 1 } });
    if (!existing) {
      await prisma.serviceItem.create({
        data: {
          order: i + 1,
          titleId: translate('id', item.titleKey),
          titleEn: translate('en', item.titleKey),
          descId: translate('id', item.descKey),
          descEn: translate('en', item.descKey),
          icon: item.icon,
          iconColor: item.iconColor,
          active: true,
        },
      });
      console.log(`✓ Layanan "${translate('id', item.titleKey)}"`);
    }
  }

  // 6. Logo pelanggan & mitra
  const pelangganFiles = [
    '/assets/images/pelanggan/logo-1.svg', 'Matahari',
    '/assets/images/pelanggan/logo-2.svg', 'Suppercorridor',
    '/assets/images/pelanggan/logo-3.svg', 'Surge',
    '/assets/images/pelanggan/logo-4.svg', 'Telkom Indonesia',
    '/assets/images/pelanggan/logo-5.svg', 'TM',
    '/assets/images/pelanggan/logo-6.svg', 'Velo',
    '/assets/images/pelanggan/logo-7.svg', 'Viberlink',
    '/assets/images/pelanggan/logo-8.svg', 'WGS',
    '/assets/images/pelanggan/logo-9.svg', 'Zenlayer',
    '/assets/images/pelanggan/logo-10.svg', 'Alfamart',
  ];
  for (let i = 0; i < pelangganFiles.length; i += 2) {
    const file = pelangganFiles[i];
    const name = pelangganFiles[i + 1];
    const existing = await prisma.customerLogo.findFirst({ where: { image: file } });
    if (!existing) {
      await prisma.customerLogo.create({ data: { name, image: file, order: i / 2 + 1, active: true } });
      console.log(`✓ Pelanggan "${name}"`);
    }
  }

  const mitraFiles = [
    '/assets/images/mitra/logo-1.svg', 'Matahari',
    '/assets/images/mitra/logo-2.svg', 'Suppercorridor',
    '/assets/images/mitra/logo-3.svg', 'Surge',
    '/assets/images/mitra/logo-4.svg', 'Telkom Indonesia',
    '/assets/images/mitra/logo-5.svg', 'TM',
    '/assets/images/mitra/logo-6.svg', 'Velo',
    '/assets/images/mitra/logo-7.svg', 'Viberlink',
    '/assets/images/mitra/logo-8.svg', 'WGS',
    '/assets/images/mitra/logo-9.svg', 'Gramedia',
    '/assets/images/mitra/logo-10.svg', 'Indomaret',
  ];
  for (let i = 0; i < mitraFiles.length; i += 2) {
    const file = mitraFiles[i];
    const name = mitraFiles[i + 1];
    const existing = await prisma.partnerLogo.findFirst({ where: { image: file } });
    if (!existing) {
      await prisma.partnerLogo.create({ data: { name, image: file, order: i / 2 + 1, active: true } });
      console.log(`✓ Mitra "${name}"`);
    }
  }

  // 7. FAQ
  for (let n = 1; n <= 6; n++) {
    const questionId = translate('id', `faq.q${n}`);
    const existing = await prisma.faqEntry.findFirst({ where: { questionId } });
    if (!existing) {
      await prisma.faqEntry.create({
        data: {
          order: n,
          questionId,
          questionEn: translate('en', `faq.q${n}`),
          answerId: translate('id', `faq.a${n}`),
          answerEn: translate('en', `faq.a${n}`),
          active: true,
        },
      });
      console.log(`✓ FAQ #${n}`);
    }
  }

  // 8. Kontak (single row)
  await prisma.contactSetting.upsert({
    where: { id: 'kontak' },
    update: {},
    create: {
      id: 'kontak',
      officeAddressId: translations.id.footer.office,
      officeAddressEn: translations.en.footer.office,
      operationalAddressId: translations.id.footer.op,
      operationalAddressEn: translations.en.footer.op,
      phone: '08111222808',
      phoneDisplay: '0811-1222-808',
      email: 'info@transhybrid.net.id',
      whatsapp: null,
    },
  });
  console.log('✓ Kontak: kontak');

  // 9. Sosial media
  const socialSeeds: { platform: string; url: string; order: number }[] = [
    { platform: 'x', url: '#', order: 1 },
    { platform: 'facebook', url: '#', order: 2 },
    { platform: 'youtube', url: '#', order: 3 },
    { platform: 'linkedin', url: '#', order: 4 },
    { platform: 'instagram', url: '#', order: 5 },
  ];
  for (const social of socialSeeds) {
    const existing = await prisma.socialMediaLink.findFirst({ where: { platform: social.platform } });
    if (!existing) {
      await prisma.socialMediaLink.create({ data: { ...social, active: true } });
      console.log(`✓ Sosial media "${social.platform}"`);
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
