'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, inputCls, labelCls } from '@/components/cms/ui';
import type { AboutFormState } from '@/app/cms/actions/about';

type Action = (prevState: AboutFormState, formData: FormData) => Promise<AboutFormState>;

const PAGE_KEYS = [
  { value: 'informasi', label: 'Informasi Perusahaan' },
  { value: 'struktur', label: 'Struktur Grup' },
  { value: 'nilai', label: 'Nilai Inti' },
] as const;

interface AboutPageInitial {
  key: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
}

interface Props {
  mode: 'edit';
  action: Action;
  initial?: AboutPageInitial | null;
}

export default function AboutPageForm({ mode, action, initial }: Props) {
  const [state, formAction] = useActionState(action, {} as AboutFormState);

  return (
    <ContentForm
      title="Edit Hero About Page"
      subtitle="Judul dan subtitle hero untuk salah satu halaman Tentang."
      error={state?.error}
      submitLabel="Simpan About Page"
      cancelHref="/cms/about-hero"
      action={formAction}
    >
      <label className="block">
        <span className={labelCls}>Halaman</span>
        <select name="key" defaultValue={initial?.key ?? 'informasi'} className={inputCls}>
          {PAGE_KEYS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleEn" label="Judul (English)" required defaultValue={initial?.titleEn} />
        <TextInput name="titleId" label="Judul (Indonesia)" defaultValue={initial?.titleId} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="subtitleEn" label="Subjudul (English)" required defaultValue={initial?.subtitleEn} />
        <TextArea name="subtitleId" label="Subjudul (Indonesia)" defaultValue={initial?.subtitleId} />
      </div>
    </ContentForm>
  );
}
