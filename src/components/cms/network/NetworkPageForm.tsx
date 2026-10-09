'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { Checkbox, OrderInput, TextArea, TextInput, Field, inputCls } from '@/components/cms/ui';
import { serviceIconNames } from '@/lib/service-icons';
import type { NetworkFormState } from '@/app/cms/actions/network';

type Action = (prevState: NetworkFormState, formData: FormData) => Promise<NetworkFormState>;

export interface NetworkPageInitial {
  id?: string;
  slug?: string;
  layout?: 'DETAIL' | 'CATEGORY';
  heroCategory?: string;
  heroBreadcrumb?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroShowSidebar?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  order?: number;
  active?: boolean;
}

export default function NetworkPageForm({
  mode,
  action,
  initial,
  menuOptions,
  defaultParentSlug,
  parentHint,
}: {
  mode: 'create' | 'edit';
  action: Action;
  initial?: NetworkPageInitial | null;
  menuOptions: { slug: string; title: string }[];
  defaultParentSlug?: string;
  parentHint?: string;
}) {
  const [state, formAction] = useActionState(action, {} as NetworkFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Halaman Jaringan' : 'Edit Halaman Jaringan'}
      subtitle="Bagian ini mengatur hero (judul di atas), sidebar, dan SEO. Isi halaman diatur lewat blok di bawahnya."
      error={state?.error}
      submitLabel={mode === 'create' ? 'Simpan Halaman' : 'Perbarui Halaman'}
      cancelHref="/cms/jaringan"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          name="slug"
          label="Slug (path tanpa /jaringan)"
          required
          defaultValue={initial?.slug}
          placeholder="maritim/backbone"
        />
        <Field label="Tipe Halaman">
          <select
            name="layout"
            defaultValue={initial?.layout ?? 'DETAIL'}
            className={inputCls}
          >
            <option value="DETAIL">Detail (1 topik per halaman)</option>
            <option value="CATEGORY">Kategori (daftar topik di bawahnya)</option>
          </select>
        </Field>
      </div>

      <TextInput
        name="heroTitle"
        label="Judul Hero"
        required
        defaultValue={initial?.heroTitle}
        placeholder="Network Coverage"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          name="heroCategory"
          label="Kategori Hero"
          defaultValue={initial?.heroCategory}
          placeholder="Network › Coverage"
        />
        <TextInput
          name="heroBreadcrumb"
          label="Breadcrumb Hero"
          defaultValue={initial?.heroBreadcrumb}
          placeholder="Network Coverage"
        />
      </div>

      <TextArea
        name="heroSubtitle"
        label="Subjudul Hero"
        defaultValue={initial?.heroSubtitle}
        rows={3}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          name="metaTitle"
          label="Meta Title (SEO)"
          defaultValue={initial?.metaTitle}
          placeholder="Network Coverage | Trans Hybrid Communication"
        />
        <OrderInput defaultValue={initial?.order} />
      </div>

      <TextArea
        name="metaDescription"
        label="Meta Description (SEO)"
        defaultValue={initial?.metaDescription}
        rows={3}
      />

      <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <Checkbox name="heroShowSidebar" label="Tampilkan sidebar jaringan" defaultChecked={initial?.heroShowSidebar ?? true} />
        <Checkbox name="active" label="Halaman aktif" defaultChecked={initial?.active ?? true} />
      </div>

      {mode === 'create' && (
        <div className="space-y-4 rounded-xl border border-brand-200 bg-brand-50/40 p-4">
          {parentHint && (
            <p className="rounded-lg bg-white/70 px-3 py-2 text-xs text-slate-600">{parentHint}</p>
          )}
          <Checkbox name="addToMenu" label="Tambahkan juga ke menu Navigasi" defaultChecked />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Jadikan anak menu">
              <select name="parentSlug" defaultValue={defaultParentSlug ?? ''} className={inputCls}>
                <option value="">Menu utama (tanpa induk)</option>
                {menuOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.title} ({option.slug})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ikon menu">
              <select name="icon" defaultValue="MapPin" className={inputCls}>
                {serviceIconNames.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <TextInput name="descEn" label="Keterangan singkat di menu" />
        </div>
      )}
    </ContentForm>
  );
}