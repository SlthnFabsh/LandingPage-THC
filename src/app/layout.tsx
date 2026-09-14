import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import RevealLoader from '@/components/RevealLoader';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import JsonLd from '@/components/Seo/JsonLd';
import {
  siteUrl,
  siteName,
  siteNameShort,
  tagline,
  defaultTitleId,
  defaultTitleEn,
  defaultDescriptionId,
  defaultDescriptionEn,
  ogImagePath,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitleId,
    template: `%s | ${siteNameShort}`,
  },
  description: defaultDescriptionId,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  generator: 'Next.js',
  keywords: [
    'Trans Hybrid Communication',
    'THC',
    'NAP Indonesia',
    'ISP Indonesia',
    'Internet Dedicated',
    'Konektivitas Jaringan',
    'ICT Managed Services',
    'Pusat Data',
    'IDC Indonesia',
    'THC-IX',
  ],
  alternates: {
    canonical: '/',
    languages: {
      id: `${siteUrl}/`,
      en: `${siteUrl}/`,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: defaultTitleEn,
    description: defaultDescriptionEn,
    locale: 'id_ID',
    alternateLocale: 'en_US',
    images: [
      {
        url: `${siteUrl}${ogImagePath}`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitleEn,
    description: defaultDescriptionEn,
    images: [`${siteUrl}${ogImagePath}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/images/logo1.webp', type: 'image/webp' },
      { url: '/assets/images/logo.png', type: 'image/png' },
    ],
    shortcut: '/assets/images/logo1.webp',
    apple: [{ url: '/assets/images/logo.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0f4c81' },
    { media: '(prefers-color-scheme: dark)', color: '#001528' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export { tagline, siteNameShort };

const organizationJson = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  alternateName: siteNameShort,
  url: siteUrl,
  logo: `${siteUrl}${ogImagePath}`,
  image: `${siteUrl}${ogImagePath}`,
  email: 'info@transhybrid.net.id',
  foundingDate: '2006',
  slogan: tagline,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-811-1222-808',
    contactType: 'customer support',
    availableLanguage: ['Indonesian', 'English'],
    areaServed: 'ID',
  },
  sameAs: [
    'https://www.instagram.com/transhybrid.communication',
    'https://www.linkedin.com/company/transhybrid-communication',
    'https://www.youtube.com/@transhybridcommunication',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.lang='en';localStorage.setItem('thc_lang','en');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-brand-600 selection:text-white overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
        <Preloader />
        <RevealLoader />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
      </body>
    </html>
  );
}