import { prisma } from '@/lib/prisma';
import { translations, translate } from '@/lib/i18n';

export interface HeroSlideData {
  id: string;
  titleId: string;
  titleEn: string;
  subtitleId: string | null;
  subtitleEn: string | null;
  ctaLabelId: string | null;
  ctaLabelEn: string | null;
  ctaHref: string | null;
  image: string;
}

export interface CompanyContentData {
  id: string;
  titleId: string;
  titleEn: string;
  p1Id: string;
  p1En: string;
  p2Id: string;
  p2En: string;
  homeImage: string | null;
}

export interface AboutContentData {
  introId: string;
  introEn: string;
  visiId: string;
  visiEn: string;
  misiId: string[];
  misiEn: string[];
  licensesId: string[];
  licensesEn: string[];
}

export interface CompanyStatData {
  id: string;
  order: number;
  value: number;
  suffix: string;
  labelId: string;
  labelEn: string;
}

export interface ServiceItemData {
  id: string;
  order: number;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  icon: string;
  iconColor: string;
}

export interface LogoData {
  id: string;
  name: string;
  image: string;
}

export interface FaqEntryData {
  id: string;
  order: number;
  questionId: string;
  questionEn: string;
  answerId: string;
  answerEn: string;
}

export interface ContactData {
  officeAddressId: string;
  officeAddressEn: string;
  operationalAddressId: string;
  operationalAddressEn: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string | null;
}

export interface SocialLinkData {
  id: string;
  platform: string;
  url: string;
  order: number;
}

export interface SiteContent {
  heroSlides: HeroSlideData[];
  company: CompanyContentData;
  about: AboutContentData;
  stats: CompanyStatData[];
  services: ServiceItemData[];
  customers: LogoData[];
  partners: LogoData[];
  faqs: FaqEntryData[];
  contact: ContactData;
  socials: SocialLinkData[];
}

const statValues = [50, 100, 19, 1, 500];
const statSuffixes = ['RB+', '+', 'Thn+', 'RB+', '+'];
const statLabelKeys = [
  'company.statPelanggan',
  'company.statPop',
  'company.statOperasi',
  'company.statKabel',
  'company.statTrafik',
];

const serviceKeys: { icon: string; iconColor: string; titleKey: string; descKey: string }[] = [
  { icon: 'wifi', iconColor: 'text-violet-600', titleKey: 'services.internet', descKey: 'services.internet.desc' },
  { icon: 'network', iconColor: 'text-emerald-500', titleKey: 'services.konektivitas', descKey: 'services.konektivitas.desc' },
  { icon: 'cpu', iconColor: 'text-yellow-400', titleKey: 'services.solusi', descKey: 'services.solusi.desc' },
  { icon: 'database', iconColor: 'text-red-500', titleKey: 'services.data', descKey: 'services.data.desc' },
];

function fallbackCompany(): CompanyContentData {
  return {
    id: 'company',
    titleId: translations.id.company.title,
    titleEn: translations.en.company.title,
    p1Id: translations.id.company.p1,
    p1En: translations.en.company.p1,
    p2Id: translations.id.company.p2,
    p2En: translations.en.company.p2,
    homeImage: '/assets/images/borneo.webp',
  };
}

function fallbackAbout(): AboutContentData {
  return {
    introId: translations.id.about.intro,
    introEn: translations.en.about.intro,
    visiId: translations.id.about.visi,
    visiEn: translations.en.about.visi,
    misiId: [...translations.id.about.misi],
    misiEn: [...translations.en.about.misi],
    licensesId: [...translations.id.about.licenses],
    licensesEn: [...translations.en.about.licenses],
  };
}

function fallbackStats(): CompanyStatData[] {
  return statValues.map((value, index) => ({
    id: `stat-${index}`,
    order: index + 1,
    value,
    suffix: statSuffixes[index],
    labelId: translate('id', statLabelKeys[index]),
    labelEn: translate('en', statLabelKeys[index]),
  }));
}

function fallbackServices(): ServiceItemData[] {
  return serviceKeys.map((item, index) => ({
    id: `service-${index}`,
    order: index + 1,
    titleId: translate('id', item.titleKey),
    titleEn: translate('en', item.titleKey),
    descId: translate('id', item.descKey),
    descEn: translate('en', item.descKey),
    icon: item.icon,
    iconColor: item.iconColor,
  }));
}

function fallbackFaqs(): FaqEntryData[] {
  return [1, 2, 3, 4, 5, 6].map((n, index) => ({
    id: `faq-${n}`,
    order: index + 1,
    questionId: translate('id', `faq.q${n}`),
    questionEn: translate('en', `faq.q${n}`),
    answerId: translate('id', `faq.a${n}`),
    answerEn: translate('en', `faq.a${n}`),
  }));
}

function fallbackContact(): ContactData {
  return {
    officeAddressId: translations.id.footer.office,
    officeAddressEn: translations.en.footer.office,
    operationalAddressId: translations.id.footer.op,
    operationalAddressEn: translations.en.footer.op,
    phone: '08111222808',
    phoneDisplay: '0811-1222-808',
    email: 'info@transhybrid.net.id',
    whatsapp: null,
  };
}

function fallbackSocials(): SocialLinkData[] {
  return [
    { id: 'x', platform: 'x', url: '#', order: 1 },
    { id: 'facebook', platform: 'facebook', url: '#', order: 2 },
    { id: 'youtube', platform: 'youtube', url: '#', order: 3 },
    { id: 'linkedin', platform: 'linkedin', url: '#', order: 4 },
  ];
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export interface AboutSiteContent {
  about: AboutContentData;
  contact: ContactData;
  socials: SocialLinkData[];
}

export async function getAboutContent(): Promise<AboutSiteContent> {
  const [companyRow, contactRow, socials] = await Promise.all([
    prisma.companyContent.findFirst().catch(() => null),
    prisma.contactSetting.findFirst().catch(() => null),
    prisma.socialMediaLink
      .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
      .catch(() => [] as never[]),
  ]);

  const about: AboutContentData = companyRow
    ? {
        introId: companyRow.introId,
        introEn: companyRow.introEn,
        visiId: companyRow.visiId,
        visiEn: companyRow.visiEn,
        misiId: splitLines(companyRow.misiId),
        misiEn: splitLines(companyRow.misiEn),
        licensesId: (companyRow.licensesId as string[]) || [],
        licensesEn: (companyRow.licensesEn as string[]) || [],
      }
    : fallbackAbout();

  const contact: ContactData = contactRow
    ? {
        officeAddressId: contactRow.officeAddressId,
        officeAddressEn: contactRow.officeAddressEn,
        operationalAddressId: contactRow.operationalAddressId,
        operationalAddressEn: contactRow.operationalAddressEn,
        phone: contactRow.phone,
        phoneDisplay: contactRow.phoneDisplay,
        email: contactRow.email,
        whatsapp: contactRow.whatsapp,
      }
    : fallbackContact();

  return {
    about,
    contact,
    socials: (socials as unknown as SocialLinkData[] | null)?.length
      ? (socials as unknown as SocialLinkData[])
      : fallbackSocials(),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [heroSlides, companyRow, stats, services, customers, partners, faqs, contactRow, socials] =
    await Promise.all([
      prisma.heroSlide
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
      prisma.companyContent.findFirst().catch(() => null),
      prisma.companyStat
        .findMany({ orderBy: [{ order: 'asc' }, { value: 'desc' }] })
        .catch(() => [] as never[]),
      prisma.serviceItem
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
      prisma.customerLogo
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
      prisma.partnerLogo
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
      prisma.faqEntry
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
      prisma.contactSetting.findFirst().catch(() => null),
      prisma.socialMediaLink
        .findMany({ where: { active: true }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
        .catch(() => [] as never[]),
    ]);

  const company = companyRow
    ? {
        id: companyRow.id,
        titleId: companyRow.titleId,
        titleEn: companyRow.titleEn,
        p1Id: companyRow.p1Id,
        p1En: companyRow.p1En,
        p2Id: companyRow.p2Id,
        p2En: companyRow.p2En,
        homeImage: companyRow.homeImage,
      } satisfies CompanyContentData
    : fallbackCompany();

  const about: AboutContentData = companyRow
    ? {
        introId: companyRow.introId,
        introEn: companyRow.introEn,
        visiId: companyRow.visiId,
        visiEn: companyRow.visiEn,
        misiId: splitLines(companyRow.misiId),
        misiEn: splitLines(companyRow.misiEn),
        licensesId: (companyRow.licensesId as string[]) || [],
        licensesEn: (companyRow.licensesEn as string[]) || [],
      }
    : fallbackAbout();

  const contact: ContactData = contactRow
    ? {
        officeAddressId: contactRow.officeAddressId,
        officeAddressEn: contactRow.officeAddressEn,
        operationalAddressId: contactRow.operationalAddressId,
        operationalAddressEn: contactRow.operationalAddressEn,
        phone: contactRow.phone,
        phoneDisplay: contactRow.phoneDisplay,
        email: contactRow.email,
        whatsapp: contactRow.whatsapp,
      }
    : fallbackContact();

  return {
    heroSlides: (heroSlides as unknown as HeroSlideData[]) ?? [],
    company,
    about,
    stats: (stats as unknown as CompanyStatData[]) ?? [],
    services: (services as unknown as ServiceItemData[]) ?? [],
    customers: (customers as unknown as LogoData[] | null) ?? [],
    partners: (partners as unknown as LogoData[] | null) ?? [],
    faqs: (faqs as unknown as FaqEntryData[] | null)?.length
      ? (faqs as unknown as FaqEntryData[])
      : fallbackFaqs(),
    contact,
    socials: (socials as unknown as SocialLinkData[] | null)?.length
      ? (socials as unknown as SocialLinkData[])
      : fallbackSocials(),
  };
}