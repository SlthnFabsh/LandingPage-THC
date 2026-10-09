'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import { writeAudit } from '@/lib/audit';
import { isServiceIconName, DEFAULT_SERVICE_ICON } from '@/lib/service-icons';
import { normalizeBlock, normalizeBlocks, type BlockType, type ServiceBlock } from '@/lib/service-blocks';
import {
  isBlockTypeValue,
  isServiceSlug,
  readBlockData,
  readChecked,
  readNumber,
  readText,
} from '@/lib/service-form';
import { processImageUpload } from '@/lib/upload';
import { serviceHref } from '@/lib/service-content';

const ERROR_NOT_AUTH = 'You are not allowed to perform this action.';
const ERROR_EXPIRED = 'Password expired. Change your password first.';

export interface ServiceFormState {
  error?: string;
}

const CMS_MENU = '/cms/layanan-halaman';

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null as null, expired: false };
  return { user, expired: isPasswordExpired(user.passwordChangedAt) };
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9/-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/\/{2,}/g, '/');
}

function revalidateService(slug?: string | null, previousSlug?: string | null) {
  revalidatePath('/');
  revalidatePath('/layanan');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(serviceHref(slug));
  if (previousSlug && previousSlug !== slug) revalidatePath(serviceHref(previousSlug));
}

async function resequenceSections(pageId: string) {
  const sections = await prisma.serviceSection.findMany({
    where: { pageId },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { id: true },
  });
  await Promise.all(
    sections.map((section, index) =>
      prisma.serviceSection.update({ where: { id: section.id }, data: { order: index + 1 } })
    )
  );
}

function toBlocks(sections: { type: string; data: unknown }[]): ServiceBlock[] {
  return normalizeBlocks(sections.map((section) => ({ type: section.type, data: section.data })));
}

/** Data kosong yang valid untuk satu tipe blok. */
function emptyBlockData(type: BlockType) {
  const block = normalizeBlock({ type, data: {} });
  return JSON.parse(JSON.stringify(block?.data ?? {}));
}

/* ------------------------------- Halaman ------------------------------- */

export async function createServicePage(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const slug = normalizeSlug(readText(formData, 'slug'));
  const heroTitle = readText(formData, 'heroTitle');

  if (!slug) return { error: 'Slug wajib diisi, contoh: internet/ip-transit' };
  if (!heroTitle) return { error: 'Judul halaman wajib diisi' };
  if (!isServiceSlug(slug)) {
    return { error: 'Slug tidak valid. Gunakan huruf kecil, angka, tanda hubung, dan garis miring.' };
  }

  const existing = await prisma.servicePage.findUnique({ where: { slug } });
  if (existing) return { error: `Halaman dengan slug "${slug}" sudah ada.` };

  const icon = readText(formData, 'icon');
  const parentSlug = readText(formData, 'parentSlug');

  const page = await prisma.servicePage.create({
    data: {
      slug,
      layout: readText(formData, 'layout') === 'CATEGORY' ? 'CATEGORY' : 'DETAIL',
      heroCategory: readText(formData, 'heroCategory') || null,
      heroBreadcrumb: readText(formData, 'heroBreadcrumb') || heroTitle,
      heroTitle,
      heroSubtitle: readText(formData, 'heroSubtitle') || null,
      heroShowSidebar: readChecked(formData, 'heroShowSidebar'),
      metaTitle: readText(formData, 'metaTitle') || null,
      metaDescription: readText(formData, 'metaDescription') || null,
      order: readNumber(formData, 'order'),
      active: readChecked(formData, 'active'),
    },
  });

  if (readChecked(formData, 'addToMenu')) {
    const menuExists = await prisma.serviceMenuItem.findUnique({ where: { slug } });
    if (!menuExists) {
      const parent = parentSlug
        ? await prisma.serviceMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
        : null;
      const siblings = await prisma.serviceMenuItem.count({
        where: { parentId: parent?.id ?? null },
      });

      await prisma.serviceMenuItem.create({
        data: {
          slug,
          parentId: parent?.id ?? null,
          titleId: heroTitle,
          titleEn: heroTitle,
          descEn: readText(formData, 'descEn') || null,
          icon: isServiceIconName(icon) ? icon : DEFAULT_SERVICE_ICON,
          isGroup: false,
          showInNavbar: true,
          showInSidebar: true,
          order: siblings + 1,
          active: true,
        },
      });
    }
  }

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'ServicePage',
    entityId: page.id,
    detail: `Service page "${slug}" created`,
  });

  revalidateService(slug);
  redirect(`${CMS_MENU}/${slug}`);
}

export async function updateServicePage(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const id = readText(formData, 'id');
  const existing = await prisma.servicePage.findUnique({ where: { id } });
  if (!existing) return { error: 'Halaman tidak ditemukan.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const slug = normalizeSlug(readText(formData, 'slug'));
  const heroTitle = readText(formData, 'heroTitle');

  if (!slug) return { error: 'Slug wajib diisi.' };
  if (!heroTitle) return { error: 'Judul halaman wajib diisi' };
  if (!isServiceSlug(slug)) {
    return { error: 'Slug tidak valid. Gunakan huruf kecil, angka, tanda hubung, dan garis miring.' };
  }

  const duplicate = await prisma.servicePage.findUnique({ where: { slug } });
  if (duplicate && duplicate.id !== id) {
    return { error: `Halaman dengan slug "${slug}" sudah dipakai halaman lain.` };
  }

  await prisma.servicePage.update({
    where: { id },
    data: {
      slug,
      layout: readText(formData, 'layout') === 'CATEGORY' ? 'CATEGORY' : 'DETAIL',
      heroCategory: readText(formData, 'heroCategory') || null,
      heroBreadcrumb: readText(formData, 'heroBreadcrumb') || heroTitle,
      heroTitle,
      heroSubtitle: readText(formData, 'heroSubtitle') || null,
      heroShowSidebar: readChecked(formData, 'heroShowSidebar'),
      metaTitle: readText(formData, 'metaTitle') || null,
      metaDescription: readText(formData, 'metaDescription') || null,
      order: readNumber(formData, 'order'),
      active: readChecked(formData, 'active'),
    },
  });

  // Judul menu ikut mengikuti judul halaman agar tidak terlihat tidak sinkron.
  if (existing.slug !== slug || existing.heroTitle !== heroTitle) {
    const menuItem = await prisma.serviceMenuItem.findUnique({ where: { slug: existing.slug } });
    if (menuItem) {
      await prisma.serviceMenuItem.update({
        where: { id: menuItem.id },
        data: { slug, titleId: heroTitle, titleEn: heroTitle },
      });
    }
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'ServicePage',
    entityId: id,
    detail: `Service page "${slug}" updated`,
  });

  revalidateService(slug, existing.slug);
  redirect(`${CMS_MENU}/${slug}`);
}

export async function deleteServicePage(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const page = await prisma.servicePage.findUnique({ where: { id } });
  if (!page) return;

  await prisma.servicePage.delete({ where: { id } });

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'ServicePage',
    entityId: id,
    detail: `Service page "${page.slug}" deleted`,
  });

  // Item menu dengan slug yang sama ikut dibuang supaya navbar tidak menaut ke
  // halaman yang sudah hilang. Kalau item itu masih punya anak, ia dipertahankan
  // sebagai group; pohon CMS akan menandai "Belum ada halaman".
  const menu = await prisma.serviceMenuItem.findUnique({ where: { slug: page.slug } });
  if (menu) {
    const childCount = await prisma.serviceMenuItem.count({ where: { parentId: menu.id } });
    if (childCount === 0) {
      await prisma.serviceMenuItem.delete({ where: { id: menu.id } });
      await writeAudit('CONTENT_DELETED', {
        userId: user.id,
        entity: 'ServiceMenuItem',
        entityId: menu.id,
        detail: `Service menu item "${menu.slug}" removed together with its page`,
      });
    }
  }

  revalidateService(page.slug);
  redirect(CMS_MENU);
}

/* -------------------------------- Blok -------------------------------- */

export interface UploadState {
  error?: string;
  url?: string;
}

/**
 * Unggah gambar untuk blok konten.
 *
 * Memakai pipeline yang sama dengan CMS berita: gambar dikompres jadi WebP
 * dan disimpan sebagai data URL, sehingga tidak butuh storage eksternal.
 */
export async function uploadServiceImage(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Pilih file gambar terlebih dahulu.' };
  }

  const result = await processImageUpload(file);
  if (result.error) return { error: result.error };
  if (!result.coverImage) return { error: 'Gagal memproses gambar.' };

  return { url: result.coverImage };
}

export async function createServiceSection(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const pageId = readText(formData, 'pageId');
  const type = readText(formData, 'type');

  if (!isBlockTypeValue(type)) return { error: 'Tipe blok tidak valid.' };

  const page = await prisma.servicePage.findUnique({ where: { id: pageId } });
  if (!page) return { error: 'Halaman tidak ditemukan.' };

  const count = await prisma.serviceSection.count({ where: { pageId } });

  await prisma.serviceSection.create({
    data: {
      pageId,
      type,
      order: count + 1,
      active: true,
      data: emptyBlockData(type),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'ServiceSection',
    entityId: pageId,
    detail: `Block ${type} added to "${page.slug}"`,
  });

  revalidateService(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

export async function updateServiceSection(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const id = readText(formData, 'id');
  const section = await prisma.serviceSection.findUnique({ where: { id } });
  if (!section) return { error: 'Blok tidak ditemukan.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const page = await prisma.servicePage.findUnique({ where: { id: section.pageId } });
  if (!page) return { error: 'Halaman tidak ditemukan.' };

  let data;
  try {
    data = readBlockData(formData, section.type, 'data');
  } catch {
    return { error: `Data blok tidak valid.` };
  }

  await prisma.serviceSection.update({
    where: { id },
    data: { data: JSON.parse(JSON.stringify(data)), active: readChecked(formData, 'active') },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'ServiceSection',
    entityId: id,
    detail: `Block ${section.type} updated on "${page.slug}"`,
  });

  revalidateService(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

export async function deleteServiceSection(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const section = await prisma.serviceSection.findUnique({ where: { id } });
  if (!section) return;

  const page = await prisma.servicePage.findUnique({ where: { id: section.pageId } });
  await prisma.serviceSection.delete({ where: { id } });
  if (page) await resequenceSections(page.id);

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'ServiceSection',
    entityId: id,
    detail: `Block ${section.type} deleted`,
  });

  if (page) {
    revalidateService(page.slug);
    redirect(`${CMS_MENU}/${page.slug}`);
  }
}

export async function moveServiceSection(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const direction = readText(formData, 'direction') === 'up' ? -1 : 1;

  const section = await prisma.serviceSection.findUnique({ where: { id } });
  if (!section) return;

  const page = await prisma.servicePage.findUnique({ where: { id: section.pageId } });
  if (!page) return;

  const siblings = await prisma.serviceSection.findMany({
    where: { pageId: page.id },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  const index = siblings.findIndex((row) => row.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= siblings.length) return;

  const current = siblings[index];
  const neighbour = siblings[target];
  const currentOrder = current.order;
  current.order = neighbour.order;
  neighbour.order = currentOrder;

  await prisma.serviceSection.update({ where: { id: current.id }, data: { order: current.order } });
  await prisma.serviceSection.update({ where: { id: neighbour.id }, data: { order: neighbour.order } });

  revalidateService(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

/* -------------------------------- Menu -------------------------------- */

export async function createMenuItem(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const slug = normalizeSlug(readText(formData, 'slug'));
  const title = readText(formData, 'titleEn');

  if (!slug) return { error: 'Slug wajib diisi.' };
  if (!title) return { error: 'Judul menu wajib diisi' };
  if (!isServiceSlug(slug)) {
    return { error: 'Slug tidak valid. Gunakan huruf kecil, angka, tanda hubung, dan garis miring.' };
  }

  const existing = await prisma.serviceMenuItem.findUnique({ where: { slug } });
  if (existing) return { error: `Menu dengan slug "${slug}" sudah ada.` };

  const parentSlug = readText(formData, 'parentSlug');
  const parent = parentSlug
    ? await prisma.serviceMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
    : null;
  const siblings = await prisma.serviceMenuItem.count({ where: { parentId: parent?.id ?? null } });
  const icon = readText(formData, 'icon');
  const isGroup = readChecked(formData, 'isGroup');

  await prisma.serviceMenuItem.create({
    data: {
      slug,
      parentId: parent?.id ?? null,
      titleId: readText(formData, 'titleId') || title,
      titleEn: title,
      descEn: readText(formData, 'descEn') || null,
      icon: isServiceIconName(icon) ? icon : DEFAULT_SERVICE_ICON,
      isGroup,
      showInNavbar: readChecked(formData, 'showInNavbar'),
      showInSidebar: readChecked(formData, 'showInSidebar'),
      order: readNumber(formData, 'order') || siblings + 1,
      active: readChecked(formData, 'active'),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'ServiceMenuItem',
    entityId: slug,
    detail: `Menu item "${slug}" created`,
  });

  revalidateService(isGroup ? null : slug);
  redirect(`${CMS_MENU}/menu`);
}

export async function updateMenuItem(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const id = readText(formData, 'id');
  const existing = await prisma.serviceMenuItem.findUnique({ where: { id } });
  if (!existing) return { error: 'Menu tidak ditemukan.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const slug = normalizeSlug(readText(formData, 'slug'));
  const title = readText(formData, 'titleEn');

  if (!slug) return { error: 'Slug wajib diisi.' };
  if (!title) return { error: 'Judul menu wajib diisi' };
  if (!isServiceSlug(slug)) {
    return { error: 'Slug tidak valid. Gunakan huruf kecil, angka, tanda hubung, dan garis miring.' };
  }

  const duplicate = await prisma.serviceMenuItem.findUnique({ where: { slug } });
  if (duplicate && duplicate.id !== id) {
    return { error: `Slug "${slug}" sudah dipakai menu lain.` };
  }

  const parentSlug = readText(formData, 'parentSlug');
  const parent = parentSlug
    ? await prisma.serviceMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
    : null;

  if (parent && parent.id === id) {
    return { error: 'Induk menu tidak boleh dirinya sendiri.' };
  }
  if (parent && parent.slug !== existing.slug && parent.slug.startsWith(`${existing.slug}/`)) {
    return { error: 'Induk menu tidak boleh berada di bawah menu ini.' };
  }

  const icon = readText(formData, 'icon');
  const isGroup = readChecked(formData, 'isGroup');

  await prisma.serviceMenuItem.update({
    where: { id },
    data: {
      slug,
      parentId: parent?.id ?? null,
      titleId: readText(formData, 'titleId') || title,
      titleEn: title,
      descEn: readText(formData, 'descEn') || null,
      icon: isServiceIconName(icon) ? icon : DEFAULT_SERVICE_ICON,
      isGroup,
      showInNavbar: readChecked(formData, 'showInNavbar'),
      showInSidebar: readChecked(formData, 'showInSidebar'),
      order: readNumber(formData, 'order'),
      active: readChecked(formData, 'active'),
    },
  });

  // Judul halaman ikut mengikuti agar navbar/sidebar dan hero tetap sama.
  if (!isGroup) {
    const page = await prisma.servicePage.findUnique({ where: { slug: existing.slug } });
    if (page && (page.heroTitle !== title || page.slug !== slug)) {
      await prisma.servicePage.update({
        where: { id: page.id },
        data: { slug, heroTitle: title, heroBreadcrumb: title },
      });
    }
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'ServiceMenuItem',
    entityId: id,
    detail: `Menu item "${slug}" updated`,
  });

  revalidateService(isGroup ? null : slug, existing.slug);
  redirect(`${CMS_MENU}/menu`);
}

export async function deleteMenuItem(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const item = await prisma.serviceMenuItem.findUnique({
    where: { id },
    include: { children: { select: { id: true, slug: true } } },
  });
  if (!item) return;

  await prisma.serviceMenuItem.delete({ where: { id } });

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'ServiceMenuItem',
    entityId: id,
    detail: `Menu item "${item.slug}" deleted (with ${item.children.length} children)`,
  });

  revalidateService();
  redirect(`${CMS_MENU}/menu`);
}

export async function moveMenuItem(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const direction = readText(formData, 'direction') === 'up' ? -1 : 1;
  const parentSlug = readText(formData, 'parentSlug');

  const item = await prisma.serviceMenuItem.findUnique({ where: { id } });
  if (!item) return;

  const parent = parentSlug
    ? await prisma.serviceMenuItem.findUnique({ where: { slug: parentSlug } })
    : null;

  const siblings = await prisma.serviceMenuItem.findMany({
    where: { parentId: parent?.id ?? null },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  const index = siblings.findIndex((row) => row.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= siblings.length) return;

  const current = siblings[index];
  const neighbour = siblings[target];
  const currentOrder = current.order;
  current.order = neighbour.order;
  neighbour.order = currentOrder;

  await prisma.serviceMenuItem.update({ where: { id: current.id }, data: { order: current.order } });
  await prisma.serviceMenuItem.update({ where: { id: neighbour.id }, data: { order: neighbour.order } });

  revalidateService();
  redirect(`${CMS_MENU}/menu`);
}
