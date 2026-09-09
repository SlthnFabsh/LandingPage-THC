'use client';

import { useFormStatus } from 'react-dom';
import { Trash2, Loader2 } from 'lucide-react';

type DeleteAction = (formData: FormData) => Promise<void> | void;

interface DeleteContentButtonProps {
  action: DeleteAction;
  id: string;
  disabled?: boolean;
  confirmText?: string;
  className?: string;
}

const DEFAULT_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 disabled:opacity-40';

export default function DeleteContentButton({
  action,
  id,
  disabled,
  confirmText = 'Hapus data ini?',
  className,
}: DeleteContentButtonProps) {
  const { pending } = useFormStatus();

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm(confirmText)) e.preventDefault();
        }}
        title="Hapus"
        disabled={disabled || pending}
        className={className ?? DEFAULT_CLASS}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </form>
  );
}