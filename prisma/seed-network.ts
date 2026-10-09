import type { Prisma, PrismaClient } from '../src/generated/prisma/client';
import { networkMenuSeed, networkPagesSeed } from '../src/lib/network-seed-data';

/**
 * Seed konten section /jaringan (Network).
 *
 * Idempotent dan TIDAK menimpa hasil edit CMS:
 * - baris yang sudah ada dibiarkan apa adanya,
 * - section hanya dibuat ketika halaman baru dibuat,
 * - menjalankan ulang seed aman dan hanya mengisi data yang hilang.
 *
 * Opsi `reset` menimpa seluruh konten /jaringan dengan data seed. Dipakai
 * hanya untuk pemulihan, misalnya setelah data blok rusak:
 *   npm run db:seed -- --reset-network
 */
export async function seedNetworkContent(
  prisma: PrismaClient,
  options: { reset?: boolean } = {}
) {
  const reset = options.reset === true;
  console.log(`\n--- Seeding konten /jaringan${reset ? ' (RESET ke data seed)' : ''} ---`);

  /* 1. Pohon menu -------------------------------------------------- */
  const idBySlug = new Map<string, string>();

  for (const [index, item] of networkMenuSeed.entries()) {
    const parentId = item.parent ? (idBySlug.get(item.parent) ?? null) : null;
    const row = await prisma.networkMenuItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        parentId,
        titleId: item.title,
        titleEn: item.title,
        descId: item.desc ?? null,
        descEn: item.desc ?? null,
        icon: item.icon,
        isGroup: item.isGroup ?? false,
        showInNavbar: item.showInNavbar !== false,
        showInSidebar: item.showInSidebar !== false,
        order: index + 1,
        active: true,
      },
      select: { id: true },
    });

    idBySlug.set(item.slug, row.id);
  }

  console.log(`✓ Menu jaringan: ${networkMenuSeed.length} item`);

  /* 2. Halaman + section blok -------------------------------------- */
  let created = 0;
  let kept = 0;
  let restored = 0;

  for (const [index, page] of networkPagesSeed.entries()) {
    const existing = await prisma.networkPage.findUnique({
      where: { slug: page.slug },
      select: { id: true },
    });

    if (existing) {
      if (reset) {
        await prisma.networkPage.update({
          where: { id: existing.id },
          data: {
            layout: page.layout,
            heroCategory: page.category,
            heroBreadcrumb: page.breadcrumb,
            heroTitle: page.title,
            heroSubtitle: page.subtitle,
            heroShowSidebar: true,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            order: index + 1,
            active: true,
            sections: {
              deleteMany: {},
              create: page.blocks.map((block, blockIndex) => ({
                type: block.type,
                order: blockIndex + 1,
                active: true,
                data: block.data as unknown as Prisma.InputJsonValue,
              })),
            },
          },
        });
        restored += 1;
      } else {
        kept += 1;
      }
      continue;
    }

    await prisma.networkPage.create({
      data: {
        slug: page.slug,
        layout: page.layout,
        heroCategory: page.category,
        heroBreadcrumb: page.breadcrumb,
        heroTitle: page.title,
        heroSubtitle: page.subtitle,
        heroShowSidebar: true,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        order: index + 1,
        active: true,
        sections: {
          create: page.blocks.map((block, blockIndex) => ({
            type: block.type,
            order: blockIndex + 1,
            active: true,
            data: block.data as unknown as Prisma.InputJsonValue,
          })),
        },
      },
    });

    created += 1;
  }

  console.log(
    `✓ Halaman jaringan: ${created} dibuat, ${kept} sudah ada (tidak ditimpa)` +
      (reset ? `, ${restored} dikembalikan ke data seed` : '')
  );

  /* 3. Jaring pengaman: menu non-group wajib punya halaman ---------- */
  const pages = await prisma.networkPage.findMany({ select: { slug: true } });
  const pageSlugs = new Set(pages.map((page) => page.slug));
  const orphans = networkMenuSeed
    .filter((item) => !item.isGroup)
    .filter((item) => !pageSlugs.has(item.slug))
    .map((item) => item.slug);

  if (orphans.length > 0) {
    console.log(`⚠️ Menu tanpa halaman: ${orphans.join(', ')}`);
  } else {
    console.log('✓ Semua menu non-group memiliki halaman');
  }
}