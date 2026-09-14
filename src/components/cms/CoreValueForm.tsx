'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, Checkbox, OrderInput } from '@/components/cms/ui';
import type { AboutFormState } from '@/app/cms/actions/about';

type ValueFormState = AboutFormState;

type Action = (prevState: ValueFormState, formData: FormData) => Promise<ValueFormState>;

interface CoreValueInitial {
  id?: string;
  letter: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  order: number;
  active: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  action: Action;
  initial?: CoreValueInitial | null;
}

export default function CoreValueForm({ mode, action, initial }: Props) {
  const [state, formAction] = useActionState(action, {} as ValueFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Nilai Inti' : 'Edit Nilai Inti'}
      subtitle="Salah satu huruf nilai T.C.A.R.E. untuk halaman Nilai Inti."
      error={state?.error}
      submitLabel={mode === 'create' ? 'Simpan Nilai Inti' : 'Perbarui Nilai Inti'}
      cancelHref="/cms/nilai-inti"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextInput name="letter" label="Huruf" required defaultValue={initial?.letter} placeholder="T" />
        <OrderInput defaultValue={initial?.order} />
        <div className="flex items-end">
          <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleEn" label="Judul (English)" required defaultValue={initial?.titleEn} />
        <TextInput name="titleId" label="Judul (Indonesia)" defaultValue={initial?.titleId} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="descriptionEn" label="Uraian (English)" required defaultValue={initial?.descriptionEn} />
        <TextArea name="descriptionId" label="Uraian (Indonesia)" defaultValue={initial?.descriptionId} />
      </div>
    </ContentForm>
  );
}
