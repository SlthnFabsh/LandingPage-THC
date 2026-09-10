'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { TextInput, TextArea } from '@/components/cms/ui';
import type { ContentFormState } from '@/app/cms/actions/content';
import type { ContactSetting } from '@/generated/prisma/client';

type Action = (prevState: ContentFormState, formData: FormData) => Promise<ContentFormState>;

interface ContactFormProps {
  action: Action;
  initial?: ContactSetting | null;
}

export default function ContactForm({ action, initial }: ContactFormProps) {
  const [state, formAction] = useActionState(action as Action, {} as ContentFormState);

  return (
    <ContentForm
      title="Contact"
      subtitle="Contact information displayed in the footer (address, phone, email)."
      error={state.error}
      submitLabel="Save Contact"
      cancelHref="/cms/kontak"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="officeAddressEn" label="Office Address *" defaultValue={initial?.officeAddressEn} required rows={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="operationalAddressEn" label="Operational Address *" defaultValue={initial?.operationalAddressEn} required rows={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="phoneDisplay" label="Phone (display) *" defaultValue={initial?.phoneDisplay} required placeholder="0811-1222-808" />
        <TextInput name="phone" label="Phone (tel: link)" defaultValue={initial?.phone} placeholder="08111222808" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="email" label="Email *" type="email" defaultValue={initial?.email} required />
        <TextInput name="whatsapp" label="WhatsApp (optional)" defaultValue={initial?.whatsapp ?? ''} />
      </div>
    </ContentForm>
  );
}