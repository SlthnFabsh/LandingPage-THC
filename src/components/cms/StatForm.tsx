'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, OrderInput, Field } from '@/components/cms/ui';
import { inputCls } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { CompanyStat } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface StatFormProps {
  mode: 'create' | 'edit';
  action: Action;
  initial?: CompanyStat | null;
}

export default function StatForm({ mode, action, initial }: StatFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Statistik' : 'Edit Statistik'}
      subtitle="Statistik yang tampil di samping section 'PERUSAHAAN'."
      error={state.error}
      submitLabel={mode === 'create' ? 'Simpan Statistik' : 'Perbarui Statistik'}
      cancelHref="/cms/profil/statistik"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Angka *">
          <input name="value" type="number" defaultValue={initial?.value} required className={inputCls} />
        </Field>
        <TextInput name="suffix" label="Sufiks (RB+, +, Thn+)" defaultValue={initial?.suffix} />
        <OrderInput defaultValue={initial?.order} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="labelId" label="Label (ID) *" defaultValue={initial?.labelId} required />
        <TextInput name="labelEn" label="Label (EN) *" defaultValue={initial?.labelEn} required />
      </div>
    </ContentForm>
  );
}