'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, OrderInput, Checkbox, Field } from '@/components/cms/ui';
import { inputCls } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { SocialMediaLink } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

const platformOptions = [
  { value: 'x', label: 'X (Twitter)' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
];

interface SocialFormProps {
  mode: 'create' | 'edit';
  action: Action;
  initial?: SocialMediaLink | null;
}

export default function SocialForm({ mode, action, initial }: SocialFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Sosial Media' : 'Edit Sosial Media'}
      subtitle="Tautan sosial media yang tampil di footer."
      error={state.error}
      submitLabel={mode === 'create' ? 'Simpan Tautan' : 'Perbarui Tautan'}
      cancelHref="/cms/sosmed"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Platform *">
          <select name="platform" defaultValue={initial?.platform ?? 'x'} className={inputCls}>
            {platformOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>
        <OrderInput defaultValue={initial?.order} />
      </div>

      <TextInput name="url" label="URL *" defaultValue={initial?.url} required placeholder="https://instagram.com/transhybrid" />

      <div className="flex items-end">
        <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
      </div>
    </ContentForm>
  );
}