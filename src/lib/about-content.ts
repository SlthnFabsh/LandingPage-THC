import { prisma } from '@/lib/prisma';

export interface MilestoneData {
  id: string;
  order: number;
  year: string;
  titleId: string;
  titleEn: string;
  pointsId: string[];
  pointsEn: string[];
  active: boolean;
}

export interface CoreValueData {
  id: string;
  order: number;
  letter: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  active: boolean;
}

export interface CoreValueSettingData {
  introId: string;
  introEn: string;
}

export interface GroupStructureData {
  parentBadge: string;
  parentName: string;
  parentTag: string;
  child1Name: string;
  child1Tag: string;
  child2Name: string;
  child2Tag: string;
  card1Label: string;
  card1Desc: string;
  card2Label: string;
  card2Desc: string;
  card3Label: string;
  card3Desc: string;
}

export type AboutPageKey = 'informasi' | 'struktur' | 'nilai';

export interface AboutPageData {
  key: AboutPageKey;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
}

const milestoneFallback: MilestoneData[] = [
  {
    id: 'fallback-2006',
    order: 1,
    year: '2006',
    titleId: 'Didirikan sebagai NAP',
    titleEn: 'Founded as a NAP',
    pointsId: ['Trans Hybrid Communication didirikan sebagai Network Access Provider (NAP).'],
    pointsEn: ['Trans Hybrid Communication founded as a Network Access Provider (NAP).'],
    active: true,
  },
  {
    id: 'fallback-2017',
    order: 2,
    year: '2017',
    titleId: 'Awal Perjalanan Informasi',
    titleEn: 'Start of the Information Journey',
    pointsId: ['Lisensi baru: Fixed Closed Network (Jartatup).'],
    pointsEn: ['New license: Fixed Closed Network (Jartatup).'],
    active: true,
  },
  {
    id: 'fallback-2018',
    order: 3,
    year: '2018',
    titleId: 'Lisensi Internasional Baru',
    titleEn: 'New International License',
    pointsId: ['Lisensi jaringan internasional baru (Jartatup International).'],
    pointsEn: ['New international network license (Jartatup International).'],
    active: true,
  },
  {
    id: 'fallback-2019',
    order: 4,
    year: '2019',
    titleId: 'Ekspansi & Lisensi Baru',
    titleEn: 'Expansion & New Licenses',
    pointsId: [
      'Lisensi baru: Internet Service Provider (ISP).',
      'Penyelesaian Kalbar Backbone.',
      'Proyek ekspansi baru: Cyber 1-IDC Fiber Backhaul.',
    ],
    pointsEn: [
      'New license: Internet Service Provider (ISP).',
      'Completion of the Kalbar Backbone.',
      'New expansion project: Cyber 1-IDC Fiber Backhaul.',
    ],
    active: true,
  },
  {
    id: 'fallback-2020',
    order: 5,
    year: '2020',
    titleId: 'Lisensi Cakupan Baru',
    titleEn: 'New Coverage Licenses',
    pointsId: [
      'Lisensi baru: FTTH (Jartaplok).',
      'Proyek ekspansi baru: Rural Penetration Using Wireless.',
    ],
    pointsEn: [
      'New license: FTTH (Jartaplok).',
      'New expansion project: Rural Penetration Using Wireless.',
    ],
    active: true,
  },
  {
    id: 'fallback-2021',
    order: 6,
    year: '2021',
    titleId: 'Rollout Fiber Kota',
    titleEn: 'City Fiber Rollout',
    pointsId: [
      'Rollout FTTH di 2 kota.',
      'Koneksi baru Singapura–Jakarta.',
      'Jalur diversitas baru Jakarta–Singapura.',
      'Proyek ekspansi baru: 50 menara.',
    ],
    pointsEn: [
      'FTTH rollout in 2 cities.',
      'New connection to Singapore–Jakarta.',
      'New diversity link Jakarta–Singapore.',
      'New expansion project: 50 towers.',
    ],
    active: true,
  },
  {
    id: 'fallback-2022',
    order: 7,
    year: '2022',
    titleId: 'Ekspansi Backbone',
    titleEn: 'Backbone Expansion',
    pointsId: [
      'Proyek TBK023.',
      'Rollout FTTH Depok–Bogor.',
      'Mempawah–Sintang Backbone.',
    ],
    pointsEn: [
      'Project TBK023.',
      'FTTH rollout Depok–Bogor.',
      'Mempawah–Sintang Backbone.',
    ],
    active: true,
  },
];

const coreValueFallback: CoreValueData[] = [
  {
    id: 'fallback-t',
    order: 1,
    letter: 'T',
    titleId: 'TRUST',
    titleEn: 'TRUST',
    descriptionId:
      'Kepercayaan adalah fondasi mendasar dari setiap interaksi di antara personel transhybrid. Kepercayaan dibangun dengan menegakkan integritas, transparansi, dan akuntabilitas, memastikan komunikasi terbuka, keandalan, dan perilaku etis dalam setiap interaksi.',
    descriptionEn:
      'Trust is the fundamental foundation of every interaction among transhybrid personnel. Trust is built by upholding integrity, transparency, and accountability, ensuring open communication, reliability, and ethical behavior in every interaction.',
    active: true,
  },
  {
    id: 'fallback-c',
    order: 2,
    letter: 'C',
    titleId: 'CUSTOMER CENTRICITY',
    titleEn: 'CUSTOMER CENTRICITY',
    descriptionId:
      'Pelanggan adalah jantung dari semua kegiatan. Personel transhybrid secara aktif mendengarkan, memahami kebutuhan mereka, dan memberikan solusi dengan empati sambil terus meningkatkan kualitas layanan untuk melebihi harapan mereka.',
    descriptionEn:
      'Customers are the heart of all activities. Transhybrid personnel actively listen, understand their needs, and provide solutions with empathy while continuously improving service quality to exceed their expectations.',
    active: true,
  },
  {
    id: 'fallback-a',
    order: 3,
    letter: 'A',
    titleId: 'AGILITY',
    titleEn: 'AGILITY',
    descriptionId:
      'Personel transhybrid merangkul perubahan dan dengan cepat beradaptasi dengan dinamika pasar dan kemajuan teknologi. Fleksibilitas, pengambilan keputusan proaktif, dan pola pikir pertumbuhan membuat perusahaan tetap kompetitif dan responsif.',
    descriptionEn:
      'Transhybrid personnel embrace change and quickly adapt to market dynamics and technological advances. Flexibility, proactive decision-making, and a growth mindset keep the company competitive and responsive.',
    active: true,
  },
  {
    id: 'fallback-r',
    order: 4,
    letter: 'R',
    titleId: 'RESULT THROUGH COLLABORATION',
    titleEn: 'RESULT THROUGH COLLABORATION',
    descriptionId:
      'Kolaborasi adalah kunci kesuksesan. Dengan mendorong komunikasi terbuka, saling menghormati, dan tujuan bersama, personel transhybrid bekerja sama baik secara internal maupun dengan mitra eksternal untuk mencapai hasil yang inovatif dan berdampak.',
    descriptionEn:
      'Collaboration is the key to success. By fostering open communication, mutual respect, and shared goals, transhybrid personnel work together both internally and with external partners to achieve innovative and impactful results.',
    active: true,
  },
  {
    id: 'fallback-e',
    order: 5,
    letter: 'E',
    titleId: 'EXCELLENCE THROUGH INNOVATION',
    titleEn: 'EXCELLENCE THROUGH INNOVATION',
    descriptionId:
      'Inovasi adalah inti dari pencapaian keunggulan. Dengan memanfaatkan teknologi, kreativitas, dan strategi visioner, Insan Transhybrid memberikan solusi transformatif yang terbaik untuk memenuhi kebutuhan pelanggan yang terus berkembang.',
    descriptionEn:
      'Innovation is the core of achieving excellence. By leveraging technology, creativity, and visionary strategies, Transhybrid people deliver the best transformative solutions to meet evolving customer needs.',
    active: true,
  },
];

const coreValueSettingFallback: CoreValueSettingData = {
  introId:
    'Ini adalah nilai-nilai inti yang memandu interaksi dan personel transhybrid langsung dalam membangun masa depan yang lebih terhubung dan inovatif untuk Indonesia.',
  introEn:
    'These are the core values that guide transhybrid personnel in building a more connected and innovative future for Indonesia.',
};

const groupStructureFallback: GroupStructureData = {
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

const aboutPageFallback: Record<AboutPageKey, AboutPageData> = {
  informasi: {
    key: 'informasi',
    titleId: 'Informasi Perusahaan',
    titleEn: 'Company Information',
    subtitleId:
      'Profil resmi, lisensi telekomunikasi, visi misi, dan komitmen PT Trans Hybrid Communication dalam menyediakan solusi konektivitas terdepan.',
    subtitleEn:
      'Official profile, telecommunication licenses, vision & mission, and the commitment of PT Trans Hybrid Communication in delivering leading connectivity solutions.',
  },
  struktur: {
    key: 'struktur',
    titleId: 'Struktur Grup Perusahaan',
    titleEn: 'Company Group Structure',
    subtitleId:
      'Struktur entitas bisnis dan anak perusahaan di bawah naungan PT Trans Hybrid Communication dalam ekosistem solusi digital nasional.',
    subtitleEn:
      'Business entity structure and subsidiaries under PT Trans Hybrid Communication within the national digital solutions ecosystem.',
  },
  nilai: {
    key: 'nilai',
    titleId: 'Nilai Inti Perusahaan',
    titleEn: 'Corporate Core Values',
    subtitleId:
      'Nilai-nilai budaya T.C.A.R.E. yang memandu setiap interaksi insan Trans Hybrid Communication dalam melayani dan berinovasi.',
    subtitleEn:
      'T.C.A.R.E. cultural values that guide every interaction of Trans Hybrid Communication personnel in serving and innovating.',
  },
};

function toPoints(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  return [];
}

export async function getMilestones(): Promise<MilestoneData[]> {
  const rows = await prisma.milestone
    .findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
    .catch(() => null);
  if (!rows || rows.length === 0) return milestoneFallback;

  return rows.map((row) => ({
    id: row.id,
    order: row.order,
    year: row.year,
    titleId: row.titleId,
    titleEn: row.titleEn,
    pointsId: toPoints(row.pointsId),
    pointsEn: toPoints(row.pointsEn),
    active: row.active,
  }));
}

export async function getCoreValues(): Promise<CoreValueData[]> {
  const rows = await prisma.coreValue
    .findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
    .catch(() => null);
  if (!rows || rows.length === 0) return coreValueFallback;

  return rows.map((row) => ({
    id: row.id,
    order: row.order,
    letter: row.letter,
    titleId: row.titleId,
    titleEn: row.titleEn,
    descriptionId: row.descriptionId,
    descriptionEn: row.descriptionEn,
    active: row.active,
  }));
}

export async function getCoreValueSetting(): Promise<CoreValueSettingData> {
  const row = await prisma.coreValueSetting.findFirst().catch(() => null);
  if (!row) return coreValueSettingFallback;
  return {
    introId: row.introId || coreValueSettingFallback.introId,
    introEn: row.introEn || coreValueSettingFallback.introEn,
  };
}

export async function getGroupStructure(): Promise<GroupStructureData> {
  const row = await prisma.groupStructure.findFirst().catch(() => null);
  if (!row) return groupStructureFallback;

  return {
    parentBadge: row.parentBadge || groupStructureFallback.parentBadge,
    parentName: row.parentName || groupStructureFallback.parentName,
    parentTag: row.parentTag || groupStructureFallback.parentTag,
    child1Name: row.child1Name || groupStructureFallback.child1Name,
    child1Tag: row.child1Tag || groupStructureFallback.child1Tag,
    child2Name: row.child2Name || groupStructureFallback.child2Name,
    child2Tag: row.child2Tag || groupStructureFallback.child2Tag,
    card1Label: row.card1Label || groupStructureFallback.card1Label,
    card1Desc: row.card1Desc || groupStructureFallback.card1Desc,
    card2Label: row.card2Label || groupStructureFallback.card2Label,
    card2Desc: row.card2Desc || groupStructureFallback.card2Desc,
    card3Label: row.card3Label || groupStructureFallback.card3Label,
    card3Desc: row.card3Desc || groupStructureFallback.card3Desc,
  };
}

export async function getAboutPage(key: AboutPageKey): Promise<AboutPageData> {
  const row = await prisma.aboutPage.findUnique({ where: { key } }).catch(() => null);
  const fallback = aboutPageFallback[key];
  if (!row) return fallback;

  return {
    key,
    titleId: row.titleId || fallback.titleId,
    titleEn: row.titleEn || fallback.titleEn,
    subtitleId: row.subtitleId || fallback.subtitleId,
    subtitleEn: row.subtitleEn || fallback.subtitleEn,
  };
}