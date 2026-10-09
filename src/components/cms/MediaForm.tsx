'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { HomeMedia } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface MediaField {
  fileName: string;
  urlName: string;
  note: string;
  fallback: string;
  key: keyof Pick<HomeMedia, 'faqThumb1' | 'faqThumb2' | 'ctaBackground' | 'ctaLogo'>;
}

const CONFIG: Record<
  'faq' | 'cta',
  { title: string; subtitle: string; submitLabel: string; fields: MediaField[] }
> = {
  faq: {
    title: 'Gambar Section FAQ',
    subtitle:
      'Thumbnail di samping section FAQ pada halaman depan. Biarkan kosong untuk memakai gambar bawaan.',
    submitLabel: 'Simpan Gambar FAQ',
    fields: [
      { fileName: 'faqThumb1', urlName: 'faqThumb1Url', note: 'Thumbnail FAQ #1', fallback: '/assets/images/news-1.webp', key: 'faqThumb1' },
      { fileName: 'faqThumb2', urlName: 'faqThumb2Url', note: 'Thumbnail FAQ #2', fallback: '/assets/images/borneo.webp', key: 'faqThumb2' },
    ],
  },
  cta: {
    title: 'Gambar Section CTA',
    subtitle:
      'Background dan logo pada section ajakan (CTA) di halaman depan. Biarkan kosong untuk memakai gambar bawaan.',
    submitLabel: 'Simpan Gambar CTA',
    fields: [
      { fileName: 'ctaBackground', urlName: 'ctaBackgroundUrl', note: 'Background CTA', fallback: '/assets/images/sutet-network.webp', key: 'ctaBackground' },
      { fileName: 'ctaLogo', urlName: 'ctaLogoUrl', note: 'Logo CTA', fallback: '/assets/images/logo1.webp', key: 'ctaLogo' },
    ],
  },
};

interface MediaFormProps {
  variant: 'faq' | 'cta';
  action: Action;
  initial?: HomeMedia | null;
}

export default function MediaForm({ variant, action, initial }: MediaFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);
  const config = CONFIG[variant];

  return (
    <ContentForm
      title={config.title}
      subtitle={config.subtitle}
      error={state.error}
      submitLabel={config.submitLabel}
      action={formAction}
      id={initial?.id}
    >
      {config.fields.map((field) => (
        <ImageInput
          key={field.fileName}
          fileName={field.fileName}
          urlName={field.urlName}
          current={initial?.[field.key] ?? field.fallback}
          note={field.note}
        />
      ))}
    </ContentForm>
  );
}
