'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { HomeMedia } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

const FALLBACKS = {
  faqThumb1: '/assets/images/news-1.webp',
  faqThumb2: '/assets/images/borneo.webp',
  ctaBackground: '/assets/images/sutet-network.webp',
  ctaLogo: '/assets/images/logo1.webp',
};

interface MediaFormProps {
  action: Action;
  initial?: HomeMedia | null;
}

export default function MediaForm({ action, initial }: MediaFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title="Media Halaman"
      subtitle="Gambar di halaman depan (section FAQ & CTA). Biarkan kosong jika ingin memakai gambar bawaan."
      error={state.error}
      submitLabel="Simpan Media"
      cancelHref="/cms/media"
      action={formAction}
      id={initial?.id}
    >
      <ImageInput
        fileName="faqThumb1"
        urlName="faqThumb1Url"
        current={initial?.faqThumb1 ?? FALLBACKS.faqThumb1}
        note="Thumbnail FAQ #1"
      />
      <ImageInput
        fileName="faqThumb2"
        urlName="faqThumb2Url"
        current={initial?.faqThumb2 ?? FALLBACKS.faqThumb2}
        note="Thumbnail FAQ #2"
      />
      <ImageInput
        fileName="ctaBackground"
        urlName="ctaBackgroundUrl"
        current={initial?.ctaBackground ?? FALLBACKS.ctaBackground}
        note="Background CTA"
      />
      <ImageInput
        fileName="ctaLogo"
        urlName="ctaLogoUrl"
        current={initial?.ctaLogo ?? FALLBACKS.ctaLogo}
        note="Logo CTA"
      />
    </ContentForm>
  );
}