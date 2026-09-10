'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, OrderInput, Checkbox, Field } from '@/components/cms/ui';
import { inputCls } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { ServiceItem } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

const iconOptions = [
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'network', label: 'Network' },
  { value: 'cpu', label: 'Chip (Solusi)' },
  { value: 'database', label: 'Database (Data Center)' },
  { value: 'layers', label: 'Layers (Umum)' },
];

const colorOptions = [
  { value: 'text-violet-600', label: 'Violet' },
  { value: 'text-emerald-500', label: 'Emerald' },
  { value: 'text-yellow-400', label: 'Kuning' },
  { value: 'text-red-500', label: 'Merah' },
  { value: 'text-brand-600', label: 'Biru Brand' },
];

interface ServiceFormProps {
  mode: 'create' | 'edit';
  action: Action;
  initial?: ServiceItem | null;
}

export default function ServiceForm({ mode, action, initial }: ServiceFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Add Service' : 'Edit Service'}
      subtitle="Service card on the home page."
      error={state.error}
      submitLabel={mode === 'create' ? 'Save Service' : 'Update Service'}
      cancelHref="/cms/layanan"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleEn" label="Title *" defaultValue={initial?.titleEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="descEn" label="Description *" defaultValue={initial?.descEn} required rows={4} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Ikon">
          <select name="icon" defaultValue={initial?.icon ?? 'layers'} className={inputCls}>
            {iconOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Warna ikon">
          <select name="iconColor" defaultValue={initial?.iconColor ?? 'text-brand-600'} className={inputCls}>
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OrderInput defaultValue={initial?.order} />
        <div className="flex items-end">
          <Checkbox name="active" label="Tampilkan" defaultChecked={initial?.active ?? true} />
        </div>
      </div>
    </ContentForm>
  );
}