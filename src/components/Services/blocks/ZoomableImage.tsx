'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, Compass } from 'lucide-react';

/**
 * Gambar yang bisa diperbesar dengan tombol zoom (dipakai peta/skema
 * jaringan). Meniru interaksi lama di halaman Network: viewport dengan
 * scroll, tombol Enlarge/Reset, dan klik pada gambar untuk toggle.
 */
export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Compass className="h-4 w-4 text-brand-600" />
          <span>Geographical Diagram</span>
        </div>
        <button
          type="button"
          onClick={() => setZoomed((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-brand-600"
        >
          {zoomed ? (
            <>
              <ZoomOut className="h-3.5 w-3.5" />
              <span>Reset View</span>
            </>
          ) : (
            <>
              <ZoomIn className="h-3.5 w-3.5" />
              <span>Enlarge</span>
            </>
          )}
        </button>
      </div>

      <div
        className={`overflow-auto p-4 transition-all duration-300 ${
          zoomed ? 'max-h-[900px]' : 'max-h-[600px]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`mx-auto rounded-xl object-contain transition-transform duration-300 ${
            zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setZoomed((prev) => !prev)}
        />
      </div>

      <div className="border-t border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-center text-xs text-slate-500">
        💡 Click the image or use the toolbar button to toggle the zoom view.
      </div>
    </figure>
  );
}