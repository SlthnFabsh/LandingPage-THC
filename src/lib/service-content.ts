import { prisma } from '@/lib/prisma';
import { normalizeBlocks, type ServiceBlock } from '@/lib/service-blocks';

/**
 * Pembacaan konten section /layanan.
 *
 * Getter selalu dibungkus `.catch()` dan memiliki fallback hardcoded agar
 * halaman tidak pernah gagal render ketika database bermasalah.
 */

export interface ServiceMenuNode {
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
  children: ServiceMenuNode[];
}

export interface ServiceNavbarItem {
  title: string;
  desc: string;
  href: string;
  icon: string;
}

export type ServiceLayout = 'DETAIL' | 'CATEGORY';

export interface ServicePageData {
  slug: string;
  layout: ServiceLayout;
  heroCategory: string;
  heroBreadcrumb: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroShowSidebar: boolean;
  metaTitle?: string;
  metaDescription?: string;
  sections: ServiceBlock[];
}

export const SERVICE_BASE_PATH = '/layanan';

/** Slug disimpan sebagai path lengkap relatif terhadap /layanan. */
export function serviceHref(slug: string): string {
  return `${SERVICE_BASE_PATH}/${slug}`;
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

const fallbackTree: FallbackNode[] = [
  {
    slug: 'internet',
    title: 'Internet Services',
    desc: 'Dedicated Fiber Optic, IP Transit & THC IX',
    icon: 'Globe',
    children: [
      { slug: 'internet/ip-transit', title: 'IP Transit (ASN 24534)', icon: 'Radio' },
      { slug: 'internet/dedicated-internet', title: 'Dedicated Internet', icon: 'Zap' },
      { slug: 'internet/thc-ix', title: 'THC IX', icon: 'Radio' },
    ],
  },
  {
    slug: 'konektivitas',
    title: 'Connectivity Services',
    desc: 'IPLC, IEPL Layer-2, Metro Ethernet & IDCB',
    icon: 'Network',
    children: [
      {
        slug: 'konektivitas/iplc',
        title: 'IPLC (International Private Leased Circuit)',
        icon: 'Cable',
      },
      {
        slug: 'konektivitas/iepl',
        title: 'IEPL (International Ethernet Private Line)',
        icon: 'ArrowLeftRight',
      },
      { slug: 'konektivitas/metro-ethernet', title: 'Local-Loop Metro Ethernet', icon: 'GitBranch' },
      {
        slug: 'konektivitas/idcb',
        title: 'Inter Data Center Backbone (IDCB)',
        icon: 'Share2',
      },
    ],
  },
  {
    slug: 'solusi',
    title: 'Solutions',
    icon: 'Cpu',
    group: true,
    navbar: false,
    children: [
      {
        slug: 'solusi/solusi-terkelola',
        title: 'Managed Solutions',
        desc: 'Hospitality & Education digital solutions',
        icon: 'Building2',
        children: [
          {
            slug: 'solusi/solusi-terkelola/hospitality-solutions',
            title: 'Hospitality Solutions',
            icon: 'Hotel',
          },
          {
            slug: 'solusi/solusi-terkelola/education-solutions',
            title: 'Education Solutions',
            icon: 'GraduationCap',
          },
        ],
      },
      {
        slug: 'solusi/layanan-terkelola',
        title: 'Managed Services',
        desc: '24/7 Managed CPE, Wi-Fi & IT NOC Monitoring',
        icon: 'ServerCog',
        children: [
          { slug: 'solusi/layanan-terkelola/managed-cpe', title: 'Managed CPE', icon: 'Router' },
          {
            slug: 'solusi/layanan-terkelola/managed-wifi',
            title: 'Managed Wi-Fi & IT',
            icon: 'Wifi',
          },
        ],
      },
    ],
  },
  {
    slug: 'pusat-data',
    title: 'Data Center',
    desc: 'Tier-3 Colocation Server & THC Cloud',
    icon: 'Database',
    children: [
      { slug: 'pusat-data/colocation', title: 'Colocation Server', icon: 'Server' },
      { slug: 'pusat-data/thc-cloud', title: 'THC Cloud', icon: 'Cloud' },
    ],
  },
];

function buildFallbackNode(node: FallbackNode, index: number): ServiceMenuNode {
  const isGroup = node.group === true;
  return {
    id: `fallback-${node.slug}`,
    slug: node.slug,
    title: node.title,
    desc: node.desc ?? '',
    icon: node.icon,
    href: isGroup ? null : serviceHref(node.slug),
    isGroup,
    showInNavbar: node.navbar !== false,
    showInSidebar: true,
    order: index + 1,
    children: (node.children ?? []).map(buildFallbackNode),
  };
}

const fallbackMenu: ServiceMenuNode[] = fallbackTree.map(buildFallbackNode);

function collectNavbarItems(nodes: ServiceMenuNode[], acc: ServiceNavbarItem[] = []) {
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

function toNode(row: MenuRow): ServiceMenuNode {
  return {
    id: row.id,
    slug: row.slug,
    title: row.titleEn,
    desc: row.descEn ?? '',
    icon: row.icon,
    href: row.isGroup ? null : serviceHref(row.slug),
    isGroup: row.isGroup,
    showInNavbar: row.showInNavbar,
    showInSidebar: row.showInSidebar,
    order: row.order,
    children: [],
  };
}

function assembleTree(rows: MenuRow[]): ServiceMenuNode[] {
  const byId = new Map<string, ServiceMenuNode>();
  const roots: ServiceMenuNode[] = [];

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

  const sortTree = (nodes: ServiceMenuNode[]) => {
    nodes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    nodes.forEach((node) => sortTree(node.children));
  };
  sortTree(roots);

  return roots;
}

/** Pohon menu lengkap (dipakai sidebar dan sebagai sumber item navbar). */
export async function getServiceMenu(): Promise<ServiceMenuNode[]> {
  const rows = await prisma.serviceMenuItem
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
export async function getServiceSidebarTree(): Promise<ServiceMenuNode[]> {
  const filter = (nodes: ServiceMenuNode[]): ServiceMenuNode[] =>
    nodes
      .filter((node) => node.showInSidebar)
      .map((node) => ({ ...node, children: filter(node.children) }));

  return filter(await getServiceMenu());
}

/**
 * Item dropdown navbar diambil dengan traversal depth-first mengikuti urutan
 * pohon, sehingga urutan tampil sama dengan urutan struktur sidebar.
 */
export async function getServiceNavbarItems(): Promise<ServiceNavbarItem[]> {
  const items = collectNavbarItems(await getServiceMenu());
  return items.length ? items : collectNavbarItems(fallbackMenu);
}

/** URL halaman layanan pertama, dipakai redirect /layanan. */
export async function getFirstServiceHref(): Promise<string> {
  const menu = await getServiceSidebarTree();
  const first = menu[0];
  if (!first) return serviceHref('internet');

  if (first.href) return first.href;

  const child = first.children.find((node) => node.href);
  if (child?.href) return child.href;

  const grandChild = first.children.flatMap((node) => node.children).find((node) => node.href);
  return grandChild?.href ?? serviceHref(first.slug);
}

export interface ServicePageMeta {
  slug: string;
  title: string;
  description: string;
  breadcrumb: string;
}

function deriveCategoryPath(slug: string, rows: Array<MenuRow>): string {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const titles: string[] = [];

  let current = bySlug.get(slug);
  while (current?.parentId) {
    const parent = byId.get(current.parentId);
    if (!parent) break;
    titles.unshift(parent.titleEn);
    current = parent;
  }

  return ['Services', ...titles].join(' \u203a ');
}

/** Halaman + seluruh blok aktifnya. Null bila slug tidak ada / nonaktif. */
export async function getServicePageBySlug(slug: string): Promise<ServicePageData | null> {
  const page = await prisma.servicePage
    .findFirst({
      where: { slug, active: true },
      include: { sections: { where: { active: true }, orderBy: { order: 'asc' } } },
    })
    .catch(() => null);

  if (!page) return null;

  const menuRows = await prisma.serviceMenuItem
    .findMany({
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
    .catch(() => []);

  return {
    slug: page.slug,
    layout: page.layout === 'CATEGORY' ? 'CATEGORY' : 'DETAIL',
    heroCategory: page.heroCategory || deriveCategoryPath(page.slug, menuRows),
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

export async function getServicePageMeta(slug: string): Promise<ServicePageMeta | null> {
  const page = await prisma.servicePage
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

  if (!page) return null;

  return {
    slug: page.slug,
    title: page.metaTitle || `${page.heroTitle} | Trans Hybrid Communication`,
    description: page.metaDescription || page.heroSubtitle || '',
    breadcrumb: page.heroBreadcrumb,
  };
}

/** Semua slug halaman aktif, dipakai sitemap dan generateStaticParams. */
export async function getServicePageSlugs(): Promise<string[]> {
  const pages = await prisma.servicePage
    .findMany({ where: { active: true }, select: { slug: true }, orderBy: { order: 'asc' } })
    .catch(() => null);

  return pages ? pages.map((page) => page.slug) : [];
}
