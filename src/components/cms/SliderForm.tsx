'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, OrderInput, Checkbox, ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { HeroSlide } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface SliderFormProps {
  mode: 'create' | 'edit';
  action: Action;
  initial?: HeroSlide | null;
}

export default function SliderForm({ mode, action, initial }: SliderFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Slide' : 'Edit Slide'}
      subtitle="Slide hero di halaman utama. Judul, subjudul, tombol, dan gambar dapat disesuaikan (ID & EN)."
      error={state.error}
      submitLabel={mode === 'create' ? 'Simpan Slide' : 'Perbarui Slide'}
      cancelHref="/cms/slider"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleId" label="Judul (ID) *" defaultValue={initial?.titleId} required />
        <TextInput name="titleEn" label="Judul (EN) *" defaultValue={initial?.titleEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="subtitleId" label="Subjudul (ID)" defaultValue={initial?.subtitleId ?? ''} rows={3} />
        <TextArea name="subtitleEn" label="Subjudul (EN)" defaultValue={initial?.subtitleEn ?? ''} rows={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="ctaLabelId" label="Tombol CTA (ID)" defaultValue={initial?.ctaLabelId ?? ''} />
        <TextInput name="ctaLabelEn" label="Tombol CTA (EN)" defaultValue={initial?.ctaLabelEn ?? ''} />
      </div>

      <TextInput name="ctaHref" label="Tautan tombol (example: #layanan)" defaultValue={initial?.ctaHref ?? ''} placeholder="#layanan" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OrderInput defaultValue={initial?.order} />
        <div className="flex items-end">
          <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
        </div>
      </div>

      <ImageInput fileName="image" urlName="imageUrl" current={initial?.image} note="Gambar latar slide" />
    </ContentForm>
  );
}