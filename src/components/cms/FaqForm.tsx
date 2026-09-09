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
      title={mode === 'create' ? 'Tambah FAQ' : 'Edit FAQ'}
      subtitle="Pertanyaan dan jawaban pada section FAQ (ID & EN)."
      error={state.error}
      submitLabel={mode === 'create' ? 'Simpan FAQ' : 'Perbarui FAQ'}
      cancelHref="/cms/faq"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="questionId" label="Pertanyaan (ID) *" defaultValue={initial?.questionId} required />
        <TextInput name="questionEn" label="Pertanyaan (EN) *" defaultValue={initial?.questionEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="answerId" label="Jawaban (ID) *" defaultValue={initial?.answerId} required rows={5} />
        <TextArea name="answerEn" label="Jawaban (EN) *" defaultValue={initial?.answerEn} required rows={5} />
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