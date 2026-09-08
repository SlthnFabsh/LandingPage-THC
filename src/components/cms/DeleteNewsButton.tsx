'use client';

import { useFormStatus } from 'react-dom';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteNews } from '@/app/cms/actions/news';

interface DeleteNewsButtonProps {
  id: string;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const DEFAULT_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 disabled:opacity-40';

export default function DeleteNewsButton({
  id,
  disabled,
  label,
  className,
}: DeleteNewsButtonProps) {
  const { pending } = useFormStatus();

  return (
    <form action={deleteNews}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Hapus berita ini?')) e.preventDefault();
        }}
        title={label ?? 'Hapus'}
        disabled={disabled || pending}
        className={className ?? DEFAULT_CLASS}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </form>
  );
}