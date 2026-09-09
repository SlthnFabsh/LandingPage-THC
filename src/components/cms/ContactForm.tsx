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
      title="Kontak"
      subtitle="Informasi kontak yang tampil di footer (alamat, telepon, email)."
      error={state.error}
      submitLabel="Simpan Kontak"
      cancelHref="/cms/kontak"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="officeAddressId" label="Alamat Office (ID) *" defaultValue={initial?.officeAddressId} required rows={3} />
        <TextArea name="officeAddressEn" label="Alamat Office (EN) *" defaultValue={initial?.officeAddressEn} required rows={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea name="operationalAddressId" label="Alamat Operational (ID) *" defaultValue={initial?.operationalAddressId} required rows={3} />
        <TextArea name="operationalAddressEn" label="Alamat Operational (EN) *" defaultValue={initial?.operationalAddressEn} required rows={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="phoneDisplay" label="Telepon (tampilan) *" defaultValue={initial?.phoneDisplay} required placeholder="0811-1222-808" />
        <TextInput name="phone" label="Telepon (tautan tel:)" defaultValue={initial?.phone} placeholder="08111222808" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput name="email" label="Email *" type="email" defaultValue={initial?.email} required />
        <TextInput name="whatsapp" label="WhatsApp (opsional)" defaultValue={initial?.whatsapp ?? ''} />
      </div>
    </ContentForm>
  );
}