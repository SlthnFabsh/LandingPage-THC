'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, OrderInput, Checkbox } from '@/components/cms/ui';
import type { AboutFormState } from '@/app/cms/actions/about';

type Action = (prevState: AboutFormState, formData: FormData) => Promise<AboutFormState>;

interface MilestoneInitial {
  id?: string;
  order: number;
  year: string;
  titleId: string;
  titleEn: string;
  pointsId: string[];
  pointsEn: string[];
  active: boolean;
}

export default function MilestoneForm({
  mode,
  action,
  initial,
}: {
  mode: 'create' | 'edit';
  action: Action;
  initial?: MilestoneInitial | null;
}) {
  const [state, formAction] = useActionState(action, {} as AboutFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Timeline' : 'Edit Timeline'}
      subtitle="Pencapaian penting perusahaan per tahun untuk halaman Informasi Perusahaan."
      error={state?.error}
      submitLabel={mode === 'create' ? 'Simpan Timeline' : 'Perbarui Timeline'}
      cancelHref="/cms/timeline"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="year" label="Tahun" required defaultValue={initial?.year} placeholder="2006" />
        <OrderInput defaultValue={initial?.order} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleId" label="Judul (Indonesia)" defaultValue={initial?.titleId} />
        <TextInput name="titleEn" label="Judul (English)" required defaultValue={initial?.titleEn} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea
          name="pointsId"
          label="Poin (Indonesia) — satu per baris"
          defaultValue={initial?.pointsId.join('\n')}
          rows={5}
        />
        <TextArea
          name="pointsEn"
          label="Poin (English) — satu per baris"
          defaultValue={initial?.pointsEn.join('\n')}
          rows={5}
        />
      </div>

      <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
    </ContentForm>
  );
}
