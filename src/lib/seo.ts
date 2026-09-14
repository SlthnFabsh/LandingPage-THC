import type { Metadata, Viewport } from 'next';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  'https://landingpage-thc.vercel.app'
).replace(/\/+$/, '');

export const siteName = 'Trans Hybrid Communication';
export const siteNameShort = 'THC';
export const tagline = '#ToTheNextLevel';

export const defaultTitleId = 'Trans Hybrid Communication';
export const defaultTitleEn = 'Trans Hybrid Communication | Internet & Digital Infrastructure Solutions';
export const defaultDescriptionId =
  'PT Trans Hybrid Communication (THC) menyediakan Solusi Internet Dedicated, Konektivitas, ICT Managed Services, dan Pusat Data untuk mempercepat transformasi digital bisnis Anda.';
export const defaultDescriptionEn =
  'PT Trans Hybrid Communication (THC) provides Dedicated Internet, Connectivity, ICT Managed Services, and Data Center solutions to accelerate your digital transformation.';

export const ogImagePath = '/assets/images/logo1.webp';
export const ogImageAlt = 'Trans Hybrid Communication';

export const socials = {
  instagram: 'https://www.instagram.com/transhybrid.communication',
  linkedin: 'https://www.linkedin.com/company/transhybrid-communication',
  facebook: 'https://www.facebook.com/transhybrid.communication',
  youtube: 'https://www.youtube.com/@transhybridcommunication',
};

export const defaultKeywords = [
  'Trans Hybrid Communication',
  'THC',
  'Internet Service Provider Indonesia',
  'Network Access Provider Indonesia',
  'Internet Dedicated',
  'Konektivitas Jaringan',
  'ICT Managed Services',
  'Pusat Data',
  'Trans Hybrid',
];

export const defaultOgImage = `${siteUrl}${ogImagePath}`;

interface BuildMetadataParams {
  path: string;
  titleId?: string;
  titleEn?: string;
  descriptionId?: string;
  descriptionEn?: string;
  keywords?: string[];
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  alternatesLocale?: Record<string, string>;
}

export function buildMetadata(p: BuildMetadataParams): Metadata {
  const url = p.canonical ?? `${siteUrl}${p.path}`;
  const titleId = p.titleId ?? defaultTitleId;
  const titleEn = p.titleEn ?? defaultTitleEn;
  const descId = p.descriptionId ?? defaultDescriptionId;
  const descEn = p.descriptionEn ?? defaultDescriptionEn;
  const canonical = p.canonical ?? `${siteUrl}${p.path}`;

  return {
    title: titleId,
    description: descId,
    keywords: p.keywords ?? defaultKeywords,
    alternates: {
      canonical,
      ...(p.alternatesLocale ? { languages: p.alternatesLocale } : {}),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName,
      title: titleEn,
      description: descEn,
      locale: 'id_ID',
      alternateLocale: 'en_US',
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: ogImageAlt }],
      ...(p.publishedTime ? { publishedTime: p.publishedTime } : {}),
      ...(p.modifiedTime ? { modifiedTime: p.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleEn,
      description: descEn,
      images: [defaultOgImage],
    },
    robots: p.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

export interface JsonLd {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    alternateName: siteNameShort,
    url: siteUrl,
    logo: defaultOgImage,
    image: defaultOgImage,
    email: 'info@transhybrid.net.id',
    foundingDate: '2006',
    tagline,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-811-1222-808',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [
      socials.instagram,
      socials.linkedin,
      socials.facebook,
      socials.youtube,
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(questions: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    alternateName: siteNameShort,
    inLanguage: 'id',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

export { buildMetadata as defaultBuildMetadata };
