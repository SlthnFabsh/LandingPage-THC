import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from '../src/lib/mariadb-conn';

const cfg = mariadbPoolConfigFromUrl(process.env.DATABASE_URL as string);
const adapter = cfg ? new PrismaMariaDb(cfg) : new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });

const aboutPages = [
  {
    key: 'informasi',
    titleId: 'Informasi Perusahaan',
    titleEn: 'Company Information',
    subtitleId:
      'Profil resmi, lisensi telekomunikasi, visi misi, dan komitmen PT Trans Hybrid Communication dalam menyediakan solusi konektivitas terdepan.',
    subtitleEn:
      'Official profile, telecommunication licenses, vision & mission, and the commitment of PT Trans Hybrid Communication in delivering leading connectivity solutions.',
  },
  {
    key: 'struktur',
    titleId: 'Struktur Grup Perusahaan',
    titleEn: 'Company Group Structure',
    subtitleId:
      'Struktur entitas bisnis dan anak perusahaan di bawah naungan PT Trans Hybrid Communication dalam ekosistem solusi digital nasional.',
    subtitleEn:
      'Business entity structure and subsidiaries under PT Trans Hybrid Communication within the national digital solutions ecosystem.',
  },
  {
    key: 'nilai',
    titleId: 'Nilai Inti Perusahaan',
    titleEn: 'Corporate Core Values',
    subtitleId:
      'Nilai-nilai budaya T.C.A.R.E. yang memandu setiap interaksi insan Trans Hybrid Communication dalam melayani dan berinovasi.',
    subtitleEn:
      'T.C.A.R.E. cultural values that guide every interaction of Trans Hybrid Communication personnel in serving and innovating.',
  },
];

const coreValues = [
  {
    order: 1,
    letter: 'T',
    titleId: 'TRUST',
    titleEn: 'TRUST',
    descriptionId:
      'Kepercayaan adalah fondasi mendasar dari setiap interaksi di antara personel transhybrid. Kepercayaan dibangun dengan menegakkan integritas, transparansi, dan akuntabilitas, memastikan komunikasi terbuka, keandalan, dan perilaku etis dalam setiap interaksi.',
    descriptionEn:
      'Trust is the fundamental foundation of every interaction among transhybrid personnel. Trust is built by upholding integrity, transparency, and accountability, ensuring open communication, reliability, and ethical behavior in every interaction.',
  },
  {
    order: 2,
    letter: 'C',
    titleId: 'CUSTOMER CENTRICITY',
    titleEn: 'CUSTOMER CENTRICITY',
    descriptionId:
      'Pelanggan adalah jantung dari semua kegiatan. Personel transhybrid secara aktif mendengarkan, memahami kebutuhan mereka, dan memberikan solusi dengan empati sambil terus meningkatkan kualitas layanan untuk melebihi harapan mereka.',
    descriptionEn:
      'Customers are the heart of all activities. Transhybrid personnel actively listen, understand their needs, and provide solutions with empathy while continuously improving service quality to exceed their expectations.',
  },
  {
    order: 3,
    letter: 'A',
    titleId: 'AGILITY',
    titleEn: 'AGILITY',
    descriptionId:
      'Personel transhybrid merangkul perubahan dan dengan cepat beradaptasi dengan dinamika pasar dan kemajuan teknologi. Fleksibilitas, pengambilan keputusan proaktif, dan pola pikir pertumbuhan membuat perusahaan tetap kompetitif dan responsif.',
    descriptionEn:
      'Transhybrid personnel embrace change and quickly adapt to market dynamics and technological advances. Flexibility, proactive decision-making, and a growth mindset keep the company competitive and responsive.',
  },
  {
    order: 4,
    letter: 'R',
    titleId: 'RESULT THROUGH COLLABORATION',
    titleEn: 'RESULT THROUGH COLLABORATION',
    descriptionId:
      'Kolaborasi adalah kunci kesuksesan. Dengan mendorong komunikasi terbuka, saling menghormati, dan tujuan bersama, personel transhybrid bekerja sama baik secara internal maupun dengan mitra eksternal untuk mencapai hasil yang inovatif dan berdampak.',
    descriptionEn:
      'Collaboration is the key to success. By fostering open communication, mutual respect, and shared goals, transhybrid personnel work together both internally and with external partners to achieve innovative and impactful results.',
  },
  {
    order: 5,
    letter: 'E',
    titleId: 'EXCELLENCE THROUGH INNOVATION',
    titleEn: 'EXCELLENCE THROUGH INNOVATION',
    descriptionId:
      'Inovasi adalah inti dari pencapaian keunggulan. Dengan memanfaatkan teknologi, kreativitas, dan strategi visioner, Insan Transhybrid memberikan solusi transformatif yang terbaik untuk memenuhi kebutuhan pelanggan yang terus berkembang.',
    descriptionEn:
      'Innovation is the core of achieving excellence. By leveraging technology, creativity, and visionary strategies, Transhybrid people deliver the best transformative solutions to meet evolving customer needs.',
  },
];

const coreValueSetting = {
  introId:
    'Ini adalah nilai-nilai inti yang memandu interaksi dan personel transhybrid dalam membangun masa depan yang lebih terhubung dan inovatif untuk Indonesia.',
  introEn:
    'These are the core values that guide transhybrid personnel in building a more connected and innovative future for Indonesia.',
};

const groupStructure = {
  parentBadge: 'Holding / Induk Perusahaan',
  parentName: 'PT TRANS HYBRID COMMUNICATION',
  parentTag: 'Network Access Provider & Telecommunications',
  child1Name: 'DUKODU',
  child1Tag: 'DIGITAL SOLUTION',
  child2Name: 'TRANS HYBRID COMMUNICATION',
  child2Tag: 'DIGITAL SOLUTION',
  card1Label: 'THC Parent',
  card1Desc:
    'Penyedia infrastruktur jaringan internet, serat optik, NAP, dan ISP skala korporasi & BUMN.',
  card2Label: 'Dukodu',
  card2Desc:
    'Unit transformasi digital & pengembangan solusi software kustom untuk kebutuhan bisnis modern.',
  card3Label: 'THC Digital',
  card3Desc:
    'Layanan integrasi komunikasi terpadu, managed ICT services, dan connectivity digital suite.',
};

async function upsertAboutPages() {
  for (const page of aboutPages) {
    await prisma.aboutPage.upsert({
      where: { key: page.key },
      update: {
        titleId: page.titleId,
        titleEn: page.titleEn,
        subtitleId: page.subtitleId,
        subtitleEn: page.subtitleEn,
      },
      create: page,
    });
  }
}

async function upsertCoreValues() {
  for (const value of coreValues) {
    const existing = await prisma.coreValue.findFirst({ where: { letter: value.letter } });
    if (existing) {
      await prisma.coreValue.update({ where: { id: existing.id }, data: value });
    } else {
      await prisma.coreValue.create({ data: { ...value, active: true } });
    }
  }
}

async function upsertCoreValueSetting() {
  const existing = await prisma.coreValueSetting.findFirst();
  if (existing) {
    await prisma.coreValueSetting.update({ where: { id: existing.id }, data: coreValueSetting });
  } else {
    await prisma.coreValueSetting.create({ data: coreValueSetting });
  }
}

async function upsertGroupStructure() {
  const existing = await prisma.groupStructure.findFirst();
  if (existing) {
    await prisma.groupStructure.update({ where: { id: existing.id }, data: groupStructure });
  } else {
    await prisma.groupStructure.create({ data: groupStructure });
  }
}

async function main() {
  await upsertAboutPages();
  await upsertCoreValues();
  await upsertCoreValueSetting();
  await upsertGroupStructure();

  const counts = {
    aboutPage: await prisma.aboutPage.count(),
    coreValue: await prisma.coreValue.count(),
    coreValueSetting: await prisma.coreValueSetting.count(),
    groupStructure: await prisma.groupStructure.count(),
    milestone: await prisma.milestone.count(),
  };
  console.log('✓ Seed tentang selesai:', counts);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());