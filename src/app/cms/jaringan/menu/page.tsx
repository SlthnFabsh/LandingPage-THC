import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import MenuTreeEditor, { type MenuItemView } from '@/components/cms/service/MenuTreeEditor';
import { ListHeader, PasswordExpiredBanner } from '@/components/cms/ListShell';
import {
  createNetworkMenuItem,
  updateNetworkMenuItem,
  deleteNetworkMenuItem,
  moveNetworkMenuItem,
} from '@/app/cms/actions/network';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Menu Jaringan | THC CMS' };

interface Row {
  id: string;
  parentId: string | null;
  slug: string;
  titleId: string;
  titleEn: string;
  descEn: string | null;
  icon: string;
  isGroup: boolean;
  showInNavbar: boolean;
  showInSidebar: boolean;
  order: number;
  active: boolean;
}

function toTree(rows: Row[]): MenuItemView[] {
  const nodes = new Map<string, MenuItemView>();
  const roots: MenuItemView[] = [];

  rows.forEach((row) => {
    nodes.set(row.id, {
      id: row.id,
      slug: row.slug,
      parentSlug: '',
      titleId: row.titleId,
      titleEn: row.titleEn,
      descEn: row.descEn ?? '',
      icon: row.icon,
      isGroup: row.isGroup,
      showInNavbar: row.showInNavbar,
      showInSidebar: row.showInSidebar,
      order: row.order,
      active: row.active,
      children: [],
    });
  });

  rows.forEach((row) => {
    const node = nodes.get(row.id);
    if (!node) return;
    const parent = row.parentId ? nodes.get(row.parentId) : undefined;
    if (parent) {
      node.parentSlug = parent.slug;
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sort = (items: MenuItemView[]) => {
    items.sort((a, b) => a.order - b.order || a.titleEn.localeCompare(b.titleEn));
    items.forEach((item) => sort(item.children));
  };
  sort(roots);

  return roots;
}

export default async function NetworkMenuPage() {
  const { passwordExpired } = await requireCms();

  const rows = await prisma.networkMenuItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  const tree = toTree(rows);
  const allOptions = rows.map((row) => ({ slug: row.slug, title: row.titleEn }));

  return (
    <div className="space-y-6">
      <ListHeader
        title="Menu Jaringan"
        subtitle="Satu sumber untuk menu Navbar dan Sidebar. Group tidak memiliki URL, halaman cukup dibuat di menu Halaman Jaringan."
      />

      {passwordExpired && <PasswordExpiredBanner />}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
        <ul className="list-inside list-disc space-y-1">
          <li>Urutan mengikuti angka pada kolom Urutan (paling kecil tampil paling atas).</li>
          <li>Centang <strong>Group</strong> untuk kategori tanpa halaman.</li>
          <li>Menyimpan judul menu akan ikut memperbarui judul halaman terkait.</li>
        </ul>
      </div>

      <MenuTreeEditor
        tree={tree}
        allOptions={allOptions}
        disabled={passwordExpired}
        actions={{
          create: createNetworkMenuItem,
          update: updateNetworkMenuItem,
          remove: deleteNetworkMenuItem,
          move: moveNetworkMenuItem,
        }}
      />
    </div>
  );
}