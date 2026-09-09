'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { CompanyContent } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

function joinLines(value: unknown): string {
  if (Array.isArray(value)) return value.join('\n');
  return '';
}

interface ProfileFormProps {
  action: Action;
  initial?: CompanyContent | null;
}

export default function ProfileForm({ action, initial }: ProfileFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title="Profil Perusahaan"
      subtitle="Konten section 'PERUSAHAAN' di beranda dan halaman Informasi Perusahaan (ID & EN)."
      error={state.error}
      submitLabel="Simpan Profil"
      cancelHref="/cms/profil"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleId" label="Judul section (ID) *" defaultValue={initial?.titleId} required />
        <TextInput name="titleEn" label="Judul section (EN) *" defaultValue={initial?.titleEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="p1Id" label="Paragraf 1 (ID) *" defaultValue={initial?.p1Id} required rows={4} />
        <TextArea name="p1En" label="Paragraf 1 (EN) *" defaultValue={initial?.p1En} required rows={4} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="p2Id" label="Paragraf 2 (ID)" defaultValue={initial?.p2Id ?? ''} rows={4} />
        <TextArea name="p2En" label="Paragraf 2 (EN)" defaultValue={initial?.p2En ?? ''} rows={4} />
      </div>

      <ImageInput fileName="homeImage" urlName="homeImageUrl" current={initial?.homeImage} note="Gambar section 'PERUSAHAAN'" />

      <div className="rounded-lg border border-brand-100 bg-brand-50/50 p-4">
        <h3 className="text-sm font-bold text-slate-900">Halaman Informasi Perusahaan</h3>
        <p className="mb-4 text-xs text-slate-500">Intro, lisensi, visi, dan misi.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea name="introId" label="Intro (ID)" defaultValue={initial?.introId ?? ''} rows={4} />
          <TextArea name="introEn" label="Intro (EN)" defaultValue={initial?.introEn ?? ''} rows={4} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea name="visiId" label="Visi (ID)" defaultValue={initial?.visiId ?? ''} rows={4} />
          <TextArea name="visiEn" label="Visi (EN)" defaultValue={initial?.visiEn ?? ''} rows={4} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Misi (ID)</label>
            <p className="mb-2 text-xs text-slate-400">Satu poin misi per baris.</p>
            <textarea name="misiId" defaultValue={initial?.misiId ?? ''} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Misi (EN)</label>
            <p className="mb-2 text-xs text-slate-400">One mission point per line.</p>
            <textarea name="misiEn" defaultValue={initial?.misiEn ?? ''} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Lisensi (ID)</label>
            <p className="mb-2 text-xs text-slate-400">Satu lisensi per baris.</p>
            <textarea name="licensesId" defaultValue={joinLines(initial?.licensesId)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Lisensi (EN)</label>
            <p className="mb-2 text-xs text-slate-400">One license per line.</p>
            <textarea name="licensesEn" defaultValue={joinLines(initial?.licensesEn)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
        </div>
      </div>
    </ContentForm>
  );
}