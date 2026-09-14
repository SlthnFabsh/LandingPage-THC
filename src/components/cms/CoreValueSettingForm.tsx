'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextArea } from '@/components/cms/ui';
import type { AboutFormState } from '@/app/cms/actions/about';

type Action = (prevState: AboutFormState, formData: FormData) => Promise<AboutFormState>;

export default function CoreValueSettingForm({
  action,
  initial,
}: {
  action: Action;
  initial: { introId: string; introEn: string } | null;
}) {
  const [state, formAction] = useActionState(action, {} as AboutFormState);

  return (
    <ContentForm
      title="Pengaturan Nilai Inti"
      subtitle="Paragraf pengantar untuk halaman Nilai Inti."
      error={state?.error}
      submitLabel="Simpan Pengaturan"
      cancelHref="/cms/nilai-inti"
      action={formAction}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="introId" label="Paragraf (Indonesia)" required defaultValue={initial?.introId} rows={6} />
        <TextArea name="introEn" label="Paragraf (English)" defaultValue={initial?.introEn} rows={6} />
      </div>
    </ContentForm>
  );
}
