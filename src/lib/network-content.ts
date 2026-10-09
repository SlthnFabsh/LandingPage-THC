import { prisma } from '@/lib/prisma';
import { normalizeBlocks, type ServiceBlock } from '@/lib/service-blocks';
import { networkMenuSeed, networkPagesSeed } from '@/lib/network-seed-data';

/**
 * Pembacaan konten section /jaringan (Network).
 *
 * Getter selalu dibungkus `.catch()` dan memiliki fallback hardcoded agar
 * halaman tidak pernah gagal render ketika database bermasalah.
 */

export interface NetworkMenuNode {
  id: string;
  slug: string;
  title: string;
  desc: string;
  icon: string;
  href: string | null;
  isGroup: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
  children: NetworkMenuNode[];
}

export interface NetworkNavbarItem {
  title: string;
  desc: string;
  href: string;
  icon: string;
}

export type NetworkLayout = 'DETAIL' | 'CATEGORY';

export interface NetworkPageData {
  slug: string;
  layout: NetworkLayout;
  heroCategory: string;
  heroBreadcrumb: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroShowSidebar: boolean;
  metaTitle?: string;
  metaDescription?: string;
  sections: ServiceBlock[];
}

export const NETWORK_BASE_PATH = '/jaringan';

/** Slug disimpan sebagai path lengkap relatif terhadap /jaringan. */
export function networkHref(slug: string): string {
  return `${NETWORK_BASE_PATH}/${slug}`;
}

/* ------------------------------------------------------------------ */
/* Fallback hardcoded (meniru struktur Navbar + Sidebar yang lama)      */
/* ------------------------------------------------------------------ */

interface FallbackNode {
  slug: string;
  title: string;
  desc?: string;
  icon: string;
  group?: boolean;
  navbar?: boolean;
  children?: FallbackNode[];
}

const fallbackTree: FallbackNode[] = networkMenuSeed.map((item) => ({
  slug: item.slug,
  title: item.title,
  desc: item.desc,
  icon: item.icon,
}));

function buildFallbackNode(node: FallbackNode, index: number): NetworkMenuNode {
  const isGroup = node.group === true;
  return {
    id: `fallback-${node.slug}`,
    slug: node.slug,
    title: node.title,
    desc: node.desc ?? '',
    icon: node.icon,
    href: isGroup ? null : networkHref(node.slug),
    isGroup,
    showInNavbar: node.navbar !== false,
    showInSidebar: true,
    order: index + 1,
    children: (node.children ?? []).map(buildFallbackNode),
  };
}

const fallbackMenu: NetworkMenuNode[] = fallbackTree.map(buildFallbackNode);

function collectNavbarItems(nodes: NetworkMenuNode[], acc: NetworkNavbarItem[] = []) {
  nodes.forEach((node) => {
    if (node.showInNavbar && node.href) {
      acc.push({ title: node.title, desc: node.desc, href: node.href, icon: node.icon });
    }
    collectNavbarItems(node.children, acc);
  });
  return acc;
}

/* ------------------------------------------------------------------ */
/* Getter                                                              */
/* ------------------------------------------------------------------ */

interface MenuRow {
  id: string;
  parentId: string | null;
  slug: string;
  titleEn: string;
  descEn: string | null;
  icon: string;
  isGroup: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
}

function toNode(row: MenuRow): NetworkMenuNode {
  return {
    id: row.id,
    slug: row.slug,
    title: row.titleEn,
    desc: row.descEn ?? '',
    icon: row.icon,
    href: row.isGroup ? null : networkHref(row.slug),
    isGroup: row.isGroup,
    showInNavbar: row.showInNavbar,
    showInSidebar: row.showInSidebar,
    order: row.order,
    children: [],
  };
}

function assembleTree(rows: MenuRow[]): NetworkMenuNode[] {
  const byId = new Map<string, NetworkMenuNode>();
  const roots: NetworkMenuNode[] = [];

  rows.forEach((row) => {
    const node = toNode(row);
    byId.set(row.id, node);
    if (!row.parentId) roots.push(node);
  });

  rows.forEach((row) => {
    if (!row.parentId) return;
    const node = byId.get(row.id);
    const parent = byId.get(row.parentId);
    if (node && parent) parent.children.push(node);
  });

  const sortTree = (nodes: NetworkMenuNode[]) => {
    nodes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    nodes.forEach((node) => sortTree(node.children));
  };
  sortTree(roots);

  return roots;
}

/** Pohon menu lengkap (dipakai sidebar dan sebagai sumber item navbar). */
export async function getNetworkMenu(): Promise<NetworkMenuNode[]> {
  const rows = await prisma.networkMenuItem
    .findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        parentId: true,
        slug: true,
        titleEn: true,
        descEn: true,
        icon: true,
        isGroup: true,
        showInNavbar: true,
        showInSidebar: true,
        order: true,
      },
    })
    .catch(() => null);

  if (!rows || rows.length === 0) return fallbackMenu;
  return assembleTree(rows);
}

/** Pohon menu untuk sidebar (hanya node yang ditandai tampil di sidebar). */
export async function getNetworkSidebarTree(): Promise<NetworkMenuNode[]> {
  const filter = (nodes: NetworkMenuNode[]): NetworkMenuNode[] =>
    nodes
      .filter((node) => node.showInSidebar)
      .map((node) => ({ ...node, children: filter(node.children) }));

  return filter(await getNetworkMenu());
}

/** Item dropdown navbar (depth-first mengikuti urutan pohon). */
export async function getNetworkNavbarItems(): Promise<NetworkNavbarItem[]> {
  const items = collectNavbarItems(await getNetworkMenu());
  return items.length ? items : collectNavbarItems(fallbackMenu);
}

/** URL halaman jaringan pertama, dipakai redirect /jaringan. */
export async function getFirstNetworkHref(): Promise<string> {
  const menu = await getNetworkSidebarTree();
  const first = menu[0];
  if (!first) return networkHref('coverage');

  if (first.href) return first.href;

  const child = first.children.find((node) => node.href);
  if (child?.href) return child.href;

  const grandChild = first.children.flatMap((node) => node.children).find((node) => node.href);
  return grandChild?.href ?? networkHref(first.slug);
}

export interface NetworkPageMeta {
  slug: string;
  title: string;
  description: string;
  breadcrumb: string;
}

/** Halaman + seluruh blok aktifnya. Null bila slug tidak ada / nonaktif. */
export async function getNetworkPageBySlug(slug: string): Promise<NetworkPageData | null> {
  const page = await prisma.networkPage
    .findFirst({
      where: { slug, active: true },
      include: { sections: { where: { active: true }, orderBy: { order: 'asc' } } },
    })
    .catch(() => null);

  if (!page) return null;

  return {
    slug: page.slug,
    layout: page.layout === 'CATEGORY' ? 'CATEGORY' : 'DETAIL',
    heroCategory: page.heroCategory || 'Network',
    heroBreadcrumb: page.heroBreadcrumb,
    heroTitle: page.heroTitle,
    heroSubtitle: page.heroSubtitle ?? undefined,
    heroShowSidebar: page.heroShowSidebar,
    metaTitle: page.metaTitle ?? undefined,
    metaDescription: page.metaDescription ?? undefined,
    sections: normalizeBlocks(
      page.sections.map((section) => ({ type: section.type, data: section.data })),
    ),
  };
}

export async function getNetworkPageMeta(slug: string): Promise<NetworkPageMeta | null> {
  const page = await prisma.networkPage
    .findFirst({
      where: { slug, active: true },
      select: {
        slug: true,
        heroTitle: true,
        heroSubtitle: true,
        metaTitle: true,
        metaDescription: true,
        heroBreadcrumb: true,
      },
    })
    .catch(() => null);

  if (page) {
    return {
      slug: page.slug,
      title: page.metaTitle || `${page.heroTitle} | Trans Hybrid Communication`,
      description: page.metaDescription || page.heroSubtitle || '',
      breadcrumb: page.heroBreadcrumb,
    };
  }

  const fallback = networkPagesSeed.find((item) => item.slug === slug);
  if (fallback) {
    return {
      slug: fallback.slug,
      title: fallback.metaTitle,
      description: fallback.metaDescription,
      breadcrumb: fallback.breadcrumb,
    };
  }

  return null;
}

/** Semua slug halaman aktif, dipakai sitemap dan generateStaticParams. */
export async function getNetworkPageSlugs(): Promise<string[]> {
  const pages = await prisma.networkPage
    .findMany({ where: { active: true }, select: { slug: true }, orderBy: { order: 'asc' } })
    .catch(() => null);

  if (pages && pages.length > 0) return pages.map((page) => page.slug);
  return networkPagesSeed.map((page) => page.slug);
}