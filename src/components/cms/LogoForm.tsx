'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, OrderInput, Checkbox, ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { CustomerLogo } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface LogoFormProps {
  entityLabel: string;
  mode: 'create' | 'edit';
  action: Action;
  initial?: CustomerLogo | null;
}

export default function LogoForm({ entityLabel, mode, action, initial }: LogoFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? `Add ${entityLabel}` : `Edit ${entityLabel}`}
      subtitle="Logo shown in the scrolling row on the home page."
      error={state.error}
      submitLabel={mode === 'create' ? 'Save' : 'Update'}
      cancelHref={entityLabel === 'Partner' ? '/cms/mitra' : '/cms/pelanggan'}
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="name" label="Name *" defaultValue={initial?.name} required />
        <OrderInput defaultValue={initial?.order} />
      </div>

      <div className="flex items-end">
        <Checkbox name="active" label="Visible" defaultChecked={initial?.active ?? true} />
      </div>

      <ImageInput fileName="image" urlName="imageUrl" current={initial?.image} note="Logo" />
    </ContentForm>
  );
}