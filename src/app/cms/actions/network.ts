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
import { networkHref } from '@/lib/network-content';

const ERROR_NOT_AUTH = 'You are not allowed to perform this action.';
const ERROR_EXPIRED = 'Password expired. Change your password first.';

export interface NetworkFormState {
  error?: string;
}

const CMS_MENU = '/cms/jaringan';

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

function revalidateNetwork(slug?: string | null, previousSlug?: string | null) {
  revalidatePath('/');
  revalidatePath('/jaringan');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(networkHref(slug));
  if (previousSlug && previousSlug !== slug) revalidatePath(networkHref(previousSlug));
}

async function resequenceSections(pageId: string) {
  const sections = await prisma.networkSection.findMany({
    where: { pageId },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { id: true },
  });
  await Promise.all(
    sections.map((section, index) =>
      prisma.networkSection.update({ where: { id: section.id }, data: { order: index + 1 } })
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

export async function createNetworkPage(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const slug = normalizeSlug(readText(formData, 'slug'));
  const heroTitle = readText(formData, 'heroTitle');

  if (!slug) return { error: 'Slug wajib diisi, contoh: maritim/backbone' };
  if (!heroTitle) return { error: 'Judul halaman wajib diisi' };
  if (!isServiceSlug(slug)) {
    return { error: 'Slug tidak valid. Gunakan huruf kecil, angka, tanda hubung, dan garis miring.' };
  }

  const existing = await prisma.networkPage.findUnique({ where: { slug } });
  if (existing) return { error: `Halaman dengan slug "${slug}" sudah ada.` };

  const icon = readText(formData, 'icon');
  const parentSlug = readText(formData, 'parentSlug');

  const page = await prisma.networkPage.create({
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
    const menuExists = await prisma.networkMenuItem.findUnique({ where: { slug } });
    if (!menuExists) {
      const parent = parentSlug
        ? await prisma.networkMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
        : null;
      const siblings = await prisma.networkMenuItem.count({
        where: { parentId: parent?.id ?? null },
      });

      await prisma.networkMenuItem.create({
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
    entity: 'NetworkPage',
    entityId: page.id,
    detail: `Network page "${slug}" created`,
  });

  revalidateNetwork(slug);
  redirect(`${CMS_MENU}/${slug}`);
}

export async function updateNetworkPage(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
  const id = readText(formData, 'id');
  const existing = await prisma.networkPage.findUnique({ where: { id } });
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

  const duplicate = await prisma.networkPage.findUnique({ where: { slug } });
  if (duplicate && duplicate.id !== id) {
    return { error: `Halaman dengan slug "${slug}" sudah dipakai halaman lain.` };
  }

  await prisma.networkPage.update({
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
    const menuItem = await prisma.networkMenuItem.findUnique({ where: { slug: existing.slug } });
    if (menuItem) {
      await prisma.networkMenuItem.update({
        where: { id: menuItem.id },
        data: { slug, titleId: heroTitle, titleEn: heroTitle },
      });
    }
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'NetworkPage',
    entityId: id,
    detail: `Network page "${slug}" updated`,
  });

  revalidateNetwork(slug, existing.slug);
  redirect(`${CMS_MENU}/${slug}`);
}

export async function deleteNetworkPage(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const page = await prisma.networkPage.findUnique({ where: { id } });
  if (!page) return;

  await prisma.networkPage.delete({ where: { id } });

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'NetworkPage',
    entityId: id,
    detail: `Network page "${page.slug}" deleted`,
  });

  const menu = await prisma.networkMenuItem.findUnique({ where: { slug: page.slug } });
  if (menu) {
    const childCount = await prisma.networkMenuItem.count({ where: { parentId: menu.id } });
    if (childCount === 0) {
      await prisma.networkMenuItem.delete({ where: { id: menu.id } });
      await writeAudit('CONTENT_DELETED', {
        userId: user.id,
        entity: 'NetworkMenuItem',
        entityId: menu.id,
        detail: `Network menu item "${menu.slug}" removed together with its page`,
      });
    }
  }

  revalidateNetwork(page.slug);
  redirect(CMS_MENU);
}

/* -------------------------------- Blok -------------------------------- */

export interface NetworkUploadState {
  error?: string;
  url?: string;
}

/**
 * Unggah gambar untuk blok konten /jaringan. Pipeline sama dengan CMS
 * layanan: gambar dikompres jadi WebP dan disimpan sebagai data URL.
 */
export async function uploadNetworkImage(
  _prevState: NetworkUploadState,
  formData: FormData
): Promise<NetworkUploadState> {
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

export async function createNetworkSection(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const pageId = readText(formData, 'pageId');
  const type = readText(formData, 'type');

  if (!isBlockTypeValue(type)) return { error: 'Tipe blok tidak valid.' };

  const page = await prisma.networkPage.findUnique({ where: { id: pageId } });
  if (!page) return { error: 'Halaman tidak ditemukan.' };

  const count = await prisma.networkSection.count({ where: { pageId } });

  await prisma.networkSection.create({
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
    entity: 'NetworkSection',
    entityId: pageId,
    detail: `Block ${type} added to "${page.slug}"`,
  });

  revalidateNetwork(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

export async function updateNetworkSection(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
  const id = readText(formData, 'id');
  const section = await prisma.networkSection.findUnique({ where: { id } });
  if (!section) return { error: 'Blok tidak ditemukan.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const page = await prisma.networkPage.findUnique({ where: { id: section.pageId } });
  if (!page) return { error: 'Halaman tidak ditemukan.' };

  let data;
  try {
    data = readBlockData(formData, section.type, 'data');
  } catch {
    return { error: `Data blok tidak valid.` };
  }

  await prisma.networkSection.update({
    where: { id },
    data: { data: JSON.parse(JSON.stringify(data)), active: readChecked(formData, 'active') },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'NetworkSection',
    entityId: id,
    detail: `Block ${section.type} updated on "${page.slug}"`,
  });

  revalidateNetwork(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

export async function deleteNetworkSection(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const section = await prisma.networkSection.findUnique({ where: { id } });
  if (!section) return;

  const page = await prisma.networkPage.findUnique({ where: { id: section.pageId } });
  await prisma.networkSection.delete({ where: { id } });
  if (page) await resequenceSections(page.id);

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'NetworkSection',
    entityId: id,
    detail: `Block ${section.type} deleted`,
  });

  if (page) {
    revalidateNetwork(page.slug);
    redirect(`${CMS_MENU}/${page.slug}`);
  }
}

export async function moveNetworkSection(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const direction = readText(formData, 'direction') === 'up' ? -1 : 1;

  const section = await prisma.networkSection.findUnique({ where: { id } });
  if (!section) return;

  const page = await prisma.networkPage.findUnique({ where: { id: section.pageId } });
  if (!page) return;

  const siblings = await prisma.networkSection.findMany({
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

  await prisma.networkSection.update({ where: { id: current.id }, data: { order: current.order } });
  await prisma.networkSection.update({ where: { id: neighbour.id }, data: { order: neighbour.order } });

  revalidateNetwork(page.slug);
  redirect(`${CMS_MENU}/${page.slug}`);
}

/* -------------------------------- Menu -------------------------------- */

export async function createNetworkMenuItem(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
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

  const existing = await prisma.networkMenuItem.findUnique({ where: { slug } });
  if (existing) return { error: `Menu dengan slug "${slug}" sudah ada.` };

  const parentSlug = readText(formData, 'parentSlug');
  const parent = parentSlug
    ? await prisma.networkMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
    : null;
  const siblings = await prisma.networkMenuItem.count({ where: { parentId: parent?.id ?? null } });
  const icon = readText(formData, 'icon');
  const isGroup = readChecked(formData, 'isGroup');

  await prisma.networkMenuItem.create({
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
    entity: 'NetworkMenuItem',
    entityId: slug,
    detail: `Menu item "${slug}" created`,
  });

  revalidateNetwork(isGroup ? null : slug);
  redirect(`${CMS_MENU}/menu`);
}

export async function updateNetworkMenuItem(
  prevState: NetworkFormState,
  formData: FormData
): Promise<NetworkFormState> {
  const id = readText(formData, 'id');
  const existing = await prisma.networkMenuItem.findUnique({ where: { id } });
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

  const duplicate = await prisma.networkMenuItem.findUnique({ where: { slug } });
  if (duplicate && duplicate.id !== id) {
    return { error: `Slug "${slug}" sudah dipakai menu lain.` };
  }

  const parentSlug = readText(formData, 'parentSlug');
  const parent = parentSlug
    ? await prisma.networkMenuItem.findUnique({ where: { slug: normalizeSlug(parentSlug) } })
    : null;

  if (parent && parent.id === id) {
    return { error: 'Induk menu tidak boleh dirinya sendiri.' };
  }
  if (parent && parent.slug !== existing.slug && parent.slug.startsWith(`${existing.slug}/`)) {
    return { error: 'Induk menu tidak boleh berada di bawah menu ini.' };
  }

  const icon = readText(formData, 'icon');
  const isGroup = readChecked(formData, 'isGroup');

  await prisma.networkMenuItem.update({
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
    const page = await prisma.networkPage.findUnique({ where: { slug: existing.slug } });
    if (page && (page.heroTitle !== title || page.slug !== slug)) {
      await prisma.networkPage.update({
        where: { id: page.id },
        data: { slug, heroTitle: title, heroBreadcrumb: title },
      });
    }
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'NetworkMenuItem',
    entityId: id,
    detail: `Menu item "${slug}" updated`,
  });

  revalidateNetwork(isGroup ? null : slug, existing.slug);
  redirect(`${CMS_MENU}/menu`);
}

export async function deleteNetworkMenuItem(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const item = await prisma.networkMenuItem.findUnique({
    where: { id },
    include: { children: { select: { id: true, slug: true } } },
  });
  if (!item) return;

  await prisma.networkMenuItem.delete({ where: { id } });

  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'NetworkMenuItem',
    entityId: id,
    detail: `Menu item "${item.slug}" deleted (with ${item.children.length} children)`,
  });

  revalidateNetwork();
  redirect(`${CMS_MENU}/menu`);
}

export async function moveNetworkMenuItem(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = readText(formData, 'id');
  const direction = readText(formData, 'direction') === 'up' ? -1 : 1;
  const parentSlug = readText(formData, 'parentSlug');

  const item = await prisma.networkMenuItem.findUnique({ where: { id } });
  if (!item) return;

  const parent = parentSlug
    ? await prisma.networkMenuItem.findUnique({ where: { slug: parentSlug } })
    : null;

  const siblings = await prisma.networkMenuItem.findMany({
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

  await prisma.networkMenuItem.update({ where: { id: current.id }, data: { order: current.order } });
  await prisma.networkMenuItem.update({ where: { id: neighbour.id }, data: { order: neighbour.order } });

  revalidateNetwork();
  redirect(`${CMS_MENU}/menu`);
}