'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, OrderInput, Checkbox } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { FaqEntry } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface FaqFormProps {
  mode: 'create' | 'edit';
  action: Action;
  initial?: FaqEntry | null;
}

export default function FaqForm({ mode, action, initial }: FaqFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Add FAQ' : 'Edit FAQ'}
      subtitle="Question and answer in the FAQ section."
      error={state.error}
      submitLabel={mode === 'create' ? 'Save FAQ' : 'Update FAQ'}
      cancelHref="/cms/faq"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="questionEn" label="Question *" defaultValue={initial?.questionEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="answerEn" label="Answer *" defaultValue={initial?.answerEn} required rows={5} />
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