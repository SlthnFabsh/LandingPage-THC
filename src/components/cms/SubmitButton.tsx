'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  label: string;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
}

const DEFAULT_CLASS = 'inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50';

export default function SubmitButton({
  label,
  pendingLabel,
  className,
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={className ?? DEFAULT_CLASS}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? (pendingLabel ?? label) : label}
    </button>
  );
}