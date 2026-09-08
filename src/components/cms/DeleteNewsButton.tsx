'use client';

import { Trash2 } from 'lucide-react';
import { deleteNews } from '@/app/cms/actions/news';

interface DeleteNewsButtonProps {
  id: string;
  disabled?: boolean;
}

export default function DeleteNewsButton({ id, disabled }: DeleteNewsButtonProps) {
  return (
    <form action={deleteNews}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Hapus berita ini?')) e.preventDefault();
        }}
        title="Hapus"
        disabled={disabled}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 disabled:opacity-40"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}