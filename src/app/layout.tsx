import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import RevealLoader from '@/components/RevealLoader';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Trans Hybrid Communication | Solusi Internet & Infrastruktur Digital #ToTheNextLevel',
  description:
    'PT Trans Hybrid Communication (THC) menyediakan solusi Internet Dedicated, Konektivitas, ICT Managed Services, dan Pusat Data terdepan untuk transformasi digital bisnis Anda.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('thc_lang');if(s==='en'||s==='id'){document.documentElement.lang=s;return;}var l=(navigator.language||'').toLowerCase();var d=l.indexOf('id')===0?'id':'en';document.documentElement.lang=d;try{localStorage.setItem('thc_lang',d);}catch(e){}}catch(e){}})();`,
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