'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea, ImageInput } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { CompanyContent } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

function joinLines(value: unknown): string {
  if (Array.isArray(value)) return value.join('\n');
  return '';
}

interface ProfileFormProps {
  action: Action;
  initial?: CompanyContent | null;
}

export default function ProfileForm({ action, initial }: ProfileFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title="Company Profile"
      subtitle="Company section content on the homepage and Company Information page."
      error={state.error}
      submitLabel="Save Profile"
      cancelHref="/cms/profil"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="titleEn" label="Section Title *" defaultValue={initial?.titleEn} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="p1En" label="Paragraph 1 *" defaultValue={initial?.p1En} required rows={4} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="p2En" label="Paragraph 2" defaultValue={initial?.p2En ?? ''} rows={4} />
      </div>

      <ImageInput fileName="homeImage" urlName="homeImageUrl" current={initial?.homeImage} note="Company section image" />

      <div className="rounded-lg border border-brand-100 bg-brand-50/50 p-4">
        <h3 className="text-sm font-bold text-slate-900">Company Information Page</h3>
        <p className="mb-4 text-xs text-slate-500">Intro, licenses, vision, and mission.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea name="introEn" label="Intro" defaultValue={initial?.introEn ?? ''} rows={4} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea name="visiEn" label="Vision" defaultValue={initial?.visiEn ?? ''} rows={4} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Mission</label>
            <p className="mb-2 text-xs text-slate-400">One mission point per line.</p>
            <textarea name="misiEn" defaultValue={initial?.misiEn ?? ''} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Licenses</label>
            <p className="mb-2 text-xs text-slate-400">One license per line.</p>
            <textarea name="licensesEn" defaultValue={joinLines(initial?.licensesEn)} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20" />
          </div>
        </div>
      </div>
    </ContentForm>
  );
}