'use client';

import { useRef, useState, useTransition } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { inputCls } from '@/components/cms/ui';
import { uploadServiceImage, type UploadState } from '@/app/cms/actions/service';

type UploadAction = (state: UploadState, formData: FormData) => Promise<UploadState>;

/**
 * Kolom path gambar + tombol unggah.
 *
 * Path tetap bisa diketik manual untuk file yang sudah ada di /public.
 * Tombol unggah memanggil server action langsung (bukan form bersarang,
 * karena komponen ini berada di dalam form blok) lalu mengisi path hasilnya.
 * Hasil unggah berupa data URL WebP, sama seperti CMS berita.
 */
export default function ImagePathField({
  name,
  label,
  defaultValue,
  disabled,
  uploadAction = uploadServiceImage,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
  uploadAction?: UploadAction;
}) {
  const [value, setValue] = useState(defaultValue ?? '');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);

    const body = new FormData();
    body.append('file', file);

    startTransition(async () => {
      const result = await uploadAction({}, body);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.url) setValue(result.url);
    });
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          name={name}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="/assets/images/contoh.webp"
          className={inputCls}
        />
        <button
          type="button"
          disabled={disabled || pending}
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {pending ? 'Mengunggah' : 'Unggah'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      {error && <p className="mt-1 text-xs font-semibold text-amber-700">{error}</p>}
      {!error && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Pratinjau gambar"
          className="mt-2 h-28 w-full rounded-lg border border-slate-200 bg-slate-50 object-contain"
        />
      )}
    </div>
  );
}
