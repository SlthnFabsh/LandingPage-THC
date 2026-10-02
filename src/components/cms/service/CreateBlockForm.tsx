'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import SubmitButton from '@/components/cms/SubmitButton';
import { BLOCK_LABELS, type BlockType } from '@/lib/service-blocks';
import type { ServiceFormState } from '@/app/cms/actions/service';

type SaveAction = (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;

/** Formulir kecil untuk membuat satu blok baru dari daftar tipe di atasnya. */
export default function CreateBlockForm({
  pageId,
  type,
  backHref,
  action,
}: {
  pageId: string;
  type: BlockType;
  backHref: string;
  action: SaveAction;
}) {
  const [state, formAction] = useActionState(action, {} as ServiceFormState);

  return (
    <form
      action={formAction}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-300 bg-brand-50/60 p-4"
    >
      <input type="hidden" name="pageId" value={pageId} />
      <input type="hidden" name="type" value={type} />

      <span className="text-sm font-semibold text-slate-700">
        Blok baru: {BLOCK_LABELS[type]}
      </span>

      {state?.error && (
        <span className="text-sm font-semibold text-red-700">{state.error}</span>
      )}

      <SubmitButton
        label="Simpan Blok Baru"
        pendingLabel="Menyimpan..."
        className="ml-auto rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      />
      <Link
        href={backHref}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        Batal
      </Link>
    </form>
  );
}
