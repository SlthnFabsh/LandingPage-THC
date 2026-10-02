'use client';

import { useActionState } from 'react';
import ContentForm from '@/components/cms/FormShell';
import { Checkbox, OrderInput, TextArea, TextInput, Field, inputCls } from '@/components/cms/ui';
import { serviceIconNames } from '@/lib/service-icons';
import type { ServiceFormState } from '@/app/cms/actions/service';

type Action = (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;

export interface ServicePageInitial {
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

export default function ServicePageForm({
  mode,
  action,
  initial,
  menuOptions,
}: {
  mode: 'create' | 'edit';
  action: Action;
  initial?: ServicePageInitial | null;
  menuOptions: { slug: string; title: string }[];
}) {
  const [state, formAction] = useActionState(action, {} as ServiceFormState);

  return (
    <ContentForm
      title={mode === 'create' ? 'Tambah Halaman Layanan' : 'Edit Halaman Layanan'}
      subtitle="Bagian ini mengatur hero (judul di atas), sidebar, dan SEO. Isi halaman diatur lewat blok di bawahnya."
      error={state?.error}
      submitLabel={mode === 'create' ? 'Simpan Halaman' : 'Perbarui Halaman'}
      cancelHref="/cms/layanan-halaman"
      action={formAction}
      id={initial?.id}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          name="slug"
          label="Slug (path tanpa /layanan)"
          required
          defaultValue={initial?.slug}
          placeholder="internet/ip-transit"
        />
        <Field label="Tipe Halaman">
          <select
            name="layout"
            defaultValue={initial?.layout ?? 'DETAIL'}
            className={inputCls}
          >
            <option value="DETAIL">Detail (1 layanan per halaman)</option>
            <option value="CATEGORY">Kategori (daftar layanan di bawahnya)</option>
          </select>
        </Field>
      </div>

      <TextInput
        name="heroTitle"
        label="Judul Hero"
        required
        defaultValue={initial?.heroTitle}
        placeholder="IP Transit (ASN 24534)"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          name="heroCategory"
          label="Kategori Hero"
          defaultValue={initial?.heroCategory}
          placeholder="Services › Internet"
        />
        <TextInput
          name="heroBreadcrumb"
          label="Breadcrumb Hero"
          defaultValue={initial?.heroBreadcrumb}
          placeholder="IP Transit"
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
          placeholder="IP Transit | Trans Hybrid Communication"
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
        <Checkbox name="heroShowSidebar" label="Tampilkan sidebar layanan" defaultChecked={initial?.heroShowSidebar ?? true} />
        <Checkbox name="active" label="Halaman aktif" defaultChecked={initial?.active ?? true} />
      </div>

      {mode === 'create' && (
        <div className="space-y-4 rounded-xl border border-brand-200 bg-brand-50/40 p-4">
          <Checkbox name="addToMenu" label="Tambahkan juga ke menu Navigasi" defaultChecked />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Jadikan anak menu">
              <select name="parentSlug" defaultValue="" className={inputCls}>
                <option value="">Menu utama (tanpa induk)</option>
                {menuOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.title} ({option.slug})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ikon menu">
              <select name="icon" defaultValue="Layers" className={inputCls}>
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
