'use client';

import { useActionState } from 'react';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import BlockFields from '@/components/cms/service/BlockFields';
import SubmitButton from '@/components/cms/SubmitButton';
import { BLOCK_LABELS, type BlockData, type BlockType } from '@/lib/service-blocks';
import type { ServiceFormState, UploadState } from '@/app/cms/actions/service';

type SaveAction = (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
type SimpleAction = (formData: FormData) => Promise<void> | void;
type UploadAction = (state: UploadState, formData: FormData) => Promise<UploadState>;

export interface BlockSection {
  id: string;
  order: number;
  type: BlockType;
  data: BlockData;
  active: boolean;
}

/** Satu blok konten: form sendiri dengan simpan, naik, turun, dan hapus. */
export default function BlockEditor({
  section,
  index,
  total,
  saveAction,
  deleteAction,
  moveAction,
  uploadAction,
  disabled,
}: {
  section: BlockSection;
  index: number;
  total: number;
  saveAction: SaveAction;
  deleteAction: SimpleAction;
  moveAction: SimpleAction;
  uploadAction?: UploadAction;
  disabled: boolean;
}) {
  const [state, formAction] = useActionState(saveAction, {} as ServiceFormState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="id" value={section.id} />

      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
        <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
          {index + 1}. {BLOCK_LABELS[section.type]}
        </span>
        <span className="text-xs text-slate-400">#{section.order}</span>
        {!section.active && (
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
            NONAKTIF
          </span>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            formAction={moveAction}
            name="direction"
            value="up"
            disabled={disabled || index === 0}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
            title="Naikkan"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            formAction={moveAction}
            name="direction"
            value="down"
            disabled={disabled || index === total - 1}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
            title="Turunkan"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            formAction={deleteAction}
            disabled={disabled}
            onClick={(event) => {
              if (!confirm(`Hapus blok ${BLOCK_LABELS[section.type]} ini?`)) event.preventDefault();
            }}
            className="rounded-lg border border-slate-200 p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-30"
            title="Hapus blok"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {state?.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>
      )}

      <BlockFields
        type={section.type}
        data={section.data}
        namePrefix="data"
        uploadAction={uploadAction}
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name="active"
          defaultChecked={section.active}
          className="h-4 w-4 accent-brand-600"
        />
        Blok aktif
      </label>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <SubmitButton
          label="Simpan Blok"
          pendingLabel="Menyimpan..."
          disabled={disabled}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        />
        <span className="text-xs text-slate-400">Perubahan langsung tampil di website.</span>
      </div>
    </form>
  );
}
