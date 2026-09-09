import type { ReactNode } from 'react';

export const inputCls =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20';

export const labelCls = 'mb-1 block text-sm font-medium text-slate-700';

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export function TextInput({
  name,
  label,
  defaultValue,
  required,
  type = 'text',
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <input name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} className={inputCls} />
    </Field>
  );
}

export function TextArea({
  name,
  label,
  defaultValue,
  required,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea name={name} defaultValue={defaultValue} required={required} rows={rows} className={inputCls} />
    </Field>
  );
}

export function OrderInput({ defaultValue }: { defaultValue?: number }) {
  return (
    <Field label="Urutan">
      <input
        name="order"
        type="number"
        defaultValue={defaultValue ?? 0}
        className={inputCls}
      />
    </Field>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-brand-600" />
      {label}
    </label>
  );
}

export function ImageInput({
  fileName,
  urlName,
  current,
  note,
}: {
  fileName: string;
  urlName: string;
  current?: string | null;
  note?: string;
}) {
  return (
    <Field label={note ?? 'Gambar / Logo'}>
      <p className="mb-2 text-xs text-slate-400">
        Unggah file (otomatis dikompres ke WebP) atau tempel URL/path gambar.
      </p>
      {current && (
        <div className="mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt="Gambar saat ini"
            className="h-24 w-36 rounded-lg border border-slate-200 bg-slate-100 object-cover"
          />
          <p className="mt-1 text-xs text-slate-400">Gambar saat ini</p>
        </div>
      )}
      <input
        name={fileName}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-white hover:file:bg-brand-700"
      />
      <label className="mt-3 block">
        <span className="mb-1 block text-xs font-medium text-slate-500">atau URL gambar:</span>
        <input
          name={urlName}
          type="text"
          placeholder="/assets/images/logo-1.svg atau https://..."
          defaultValue={current && (current.startsWith('/') || current.startsWith('http')) ? current : ''}
          className={inputCls}
        />
      </label>
    </Field>
  );
}