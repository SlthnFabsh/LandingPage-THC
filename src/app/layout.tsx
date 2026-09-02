import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import RevealLoader from '@/components/RevealLoader';

export const metadata: Metadata = {
  title: 'Trans Hybrid Communication | Solusi Internet & Infrastruktur Digital #ToTheNextLevel',
  description:
    'PT Trans Hybrid Communication (THC) menyediakan solusi Internet Dedicated, Konektivitas, ICT Managed Services, dan Pusat Data terdepan untuk transformasi digital bisnis Anda.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-brand-600 selection:text-white overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
        <RevealLoader />
      </body>
    </html>
  );
}