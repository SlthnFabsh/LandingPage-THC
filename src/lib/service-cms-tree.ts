/**
 * Pohon halaman layanan untuk CMS.
 *
 * Sumbernya adalah ServiceMenuItem (satu sumber untuk Navbar & Sidebar) yang
 * digabung dengan ServicePage. Jadi urutan, group, dan anak-anaknya di CMS
 * sama persis dengan yang tampil di website, dan admin tidak perluebak
 * halaman mana punya halaman induk.
 *
 * Modul ini murni (tanpa Prisma) supaya bisa dipakai di server maupun client.
 */

export const BLOCK_LABELS_SHORT: Record<string, string> = {
  INTRO: 'Teks',
  BADGES: 'Lencana',
  METRICS: 'Statistik',
  FEATURES: 'Fitur',
  CARDS: 'Kartu',
  TABS: 'Tab',
  TABLE: 'Tabel',
  PROCESS: 'Proses',
  IMAGE: 'Gambar',
  CTA: 'CTA',
};

export interface ServiceTreeMenuRow {
  id: string;
  parentId: string | null;
  slug: string;
  titleEn: string;
  isGroup: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
  active: boolean;
}

export interface ServiceTreePageRow {
  slug: string;
  id: string;
  heroTitle: string;
  layout: 'DETAIL' | 'CATEGORY';
  active: boolean;
  blockTypes: string[];
  updatedLabel: string;
}

export interface ServiceTreeNode {
  id: string;
  slug: string;
  title: string;
  isGroup: boolean;
  active: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
  depth: number;
  /** true bila ada ServicePage dengan slug yang sama. */
  hasPage: boolean;
  pageId: string | null;
  pageActive: boolean;
  layout: 'DETAIL' | 'CATEGORY' | null;
  blockLabels: string[];
  updatedLabel: string | null;
  children: ServiceTreeNode[];
}

export interface ServiceTree {
  roots: ServiceTreeNode[];
  /** Halaman yang tidak punya item menu, supaya admin tahu harus diurus. */
  orphans: ServiceTreePageRow[];
}

export function buildServiceTree(
  menuRows: ServiceTreeMenuRow[],
  pageRows: ServiceTreePageRow[]
): ServiceTree {
  const pageBySlug = new Map(pageRows.map((page) => [page.slug, page]));
  const nodes = new Map<string, ServiceTreeNode>();

  menuRows.forEach((row) => {
    nodes.set(row.id, {
      id: row.id,
      slug: row.slug,
      title: row.titleEn,
      isGroup: row.isGroup,
      active: row.active,
      showInNavbar: row.showInNavbar,
      showInSidebar: row.showInSidebar,
      order: row.order,
      depth: 0,
      hasPage: false,
      pageId: null,
      pageActive: false,
      layout: null,
      blockLabels: [],
      updatedLabel: null,
      children: [],
    });
  });

  const roots: ServiceTreeNode[] = [];

  menuRows.forEach((row) => {
    const node = nodes.get(row.id);
    if (!node) return;
    const parent = row.parentId ? nodes.get(row.parentId) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  });

  const applyDepth = (list: ServiceTreeNode[], depth: number) => {
    list.forEach((node) => {
      node.depth = depth;
      const page = pageBySlug.get(node.slug);
      if (page) {
        node.hasPage = true;
        node.pageId = page.id;
        node.pageActive = page.active;
        node.layout = page.layout;
        node.blockLabels = page.blockTypes.map((type) => BLOCK_LABELS_SHORT[type] ?? type);
        node.updatedLabel = page.updatedLabel;
        pageBySlug.delete(node.slug);
      }
      applyDepth(node.children, depth + 1);
    });
  };

  applyDepth(roots, 0);

  const orphans = [...pageBySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  return { roots, orphans };
}

/** Cari rantai node dari akar sampai node dengan slug tertentu. */
export function findServicePath(nodes: ServiceTreeNode[], slug: string): ServiceTreeNode[] {
  for (const node of nodes) {
    if (node.slug === slug) return [node];
    const found = findServicePath(node.children, slug);
    if (found.length) return [node, ...found];
  }
  return [];
}

/** Hitung jumlah halaman (bukan group) di bawah sebuah node, termasuk dirinya. */
export function countPages(node: ServiceTreeNode): number {
  const self = node.hasPage ? 1 : 0;
  return node.children.reduce((total, child) => total + countPages(child), self);
}
