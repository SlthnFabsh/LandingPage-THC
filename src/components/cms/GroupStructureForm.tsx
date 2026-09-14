'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, Checkbox } from '@/components/cms/ui';
import type { AboutFormState } from '@/app/cms/actions/about';

type Action = (prevState: AboutFormState, formData: FormData) => Promise<AboutFormState>;

interface GroupStructureInitial {
  id?: string;
  parentBadge: string;
  parentName: string;
  parentTag: string;
  child1Name: string;
  child1Tag: string;
  child2Name: string;
  child2Tag: string;
  card1Label: string;
  card1Desc: string;
  card2Label: string;
  card2Desc: string;
  card3Label: string;
  card3Desc: string;
  active: boolean;
}

export default function GroupStructureForm({
  action,
  initial,
}: {
  action: Action;
  initial?: GroupStructureInitial | null;
}) {
  const [state, formAction] = useActionState(action, {} as AboutFormState);

  return (
    <ContentForm
      title="Ubah Struktur Grup"
      subtitle="Diagram kepemilikan grup dan anak perusahaan untuk halaman Struktur Grup."
      error={state?.error}
      submitLabel="Simpan Struktur Grup"
      cancelHref="/cms/struktur-grup"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <TextInput name="parentBadge" label="Badge Induk" required defaultValue={initial?.parentBadge} placeholder="PT Trans Hybrid Communication" />
        <TextInput name="parentName" label="Nama Induk" defaultValue={initial?.parentName} placeholder="PT Trans Hybrid Communication" />
        <TextInput name="parentTag" label="Tag Induk" defaultValue={initial?.parentTag} placeholder="perusahaan induk" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <TextInput name="child1Name" label="Anak Perusahaan 1" required defaultValue={initial?.child1Name} placeholder="PT Dukodu Digital Solution" />
        <TextInput name="child1Tag" label="Tag 1" defaultValue={initial?.child1Tag} />
        <TextInput name="child2Name" label="Anak Perusahaan 2" required defaultValue={initial?.child2Name} placeholder="PT THC Digital Solution" />
        <TextInput name="child2Tag" label="Tag 2" defaultValue={initial?.child2Tag} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextInput name="card1Label" label="Agenda 1" defaultValue={initial?.card1Label} />
        <TextInput name="card2Label" label="Agenda 2" defaultValue={initial?.card2Label} />
        <TextInput name="card3Label" label="Agenda 3" defaultValue={initial?.card3Label} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextArea name="card1Desc" label="Uraian Agenda 1" defaultValue={initial?.card1Desc} rows={2} />
        <TextArea name="card2Desc" label="Uraian Agenda 2" defaultValue={initial?.card2Desc} rows={2} />
        <TextArea name="card3Desc" label="Uraian Agenda 3" defaultValue={initial?.card3Desc} rows={2} />
      </div>

      <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
    </ContentForm>
  );
}
