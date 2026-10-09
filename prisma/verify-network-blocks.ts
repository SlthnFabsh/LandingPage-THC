/**
 * Uji bolak-balik (round-trip) blok konten /jaringan.
 *
 * Menyalin data blok NetworkSection ke FormData (persis nama field pada
 * editor `BlockFields`), lalu membacanya kembali lewat `readBlockData()`
 * dan membandingkan hasilnya dengan data awal.
 *
 * Jalankan: npm run verify:network
 */
import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from '../src/lib/mariadb-conn';
import { normalizeBlock, type BlockType } from '../src/lib/service-blocks';
import { fieldName, readBlockData } from '../src/lib/service-form';

const connectionString = process.env.DATABASE_URL as string;
const config = mariadbPoolConfigFromUrl(connectionString);
const prisma = new PrismaClient({
  adapter: config ? new PrismaMariaDb(config) : new PrismaMariaDb(connectionString),
});

const LIST_FIELDS = new Set(['features', 'cells', 'footnotes']);
const ROW_ARRAY_FIELDS = new Set(['items', 'rows', 'columns']);

function fill(form: FormData, path: (string | number)[], type: BlockType, value: unknown): void {
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    if (LIST_FIELDS.has(String(path[path.length - 1])) || type === 'BADGES') {
      form.append(fieldName('data', ...path), (value as string[]).join('\n'));
      return;
    }
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
        fill(form, [...path, index], type, item);
        return;
      }
      fill(form, [...path, index], type, item);
    });
    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, child]) => {
      if (key === 'type' && typeof child === 'string') {
        form.append(fieldName('data', ...path, 'type'), child);
        return;
      }
      if (key === 'blocks' && Array.isArray(child)) {
        child.forEach((block, index) => {
          const blockPath = [...path, 'blocks', index];
          const record = block as { type?: string; data?: unknown };
          if (record.type) form.append(fieldName('data', ...blockPath, 'type'), record.type);
          fill(form, [...blockPath, 'data'], (record.type ?? 'INTRO') as BlockType, record.data ?? {});
        });
        return;
      }
      fill(form, [...path, key], type, child);
    });
    return;
  }

  const name = fieldName('data', ...path);
  if (typeof value === 'boolean') {
    if (value) form.append(name, 'on');
    return;
  }
  if (typeof value === 'number') {
    form.append(name, String(value));
    return;
  }
  if (typeof value === 'string') {
    form.append(name, value);
  }
}

async function main() {
  const pages = await prisma.networkPage.findMany({
    orderBy: { slug: 'asc' },
    include: { sections: { orderBy: { order: 'asc' } } },
  });

  let checked = 0;
  const failures: string[] = [];

  for (const page of pages) {
    for (const section of page.sections) {
      const block = normalizeBlock({ type: section.type, data: section.data });
      if (!block) {
        failures.push(`${page.slug} #${section.order} ${section.type} (tipe tidak valid)`);
        continue;
      }

      const form = new FormData();
      fill(form, [], block.type as BlockType, block.data);

      const roundTrip = readBlockData(form, block.type as BlockType, 'data');
      const before = JSON.stringify(block.data);
      const after = JSON.stringify(roundTrip);

      checked += 1;
      if (before !== after) {
        failures.push(`${page.slug} blok #${section.order} (${block.type})`);
        console.log(`\n--- SEBELUM ${block.type} ${page.slug}`);
        console.log(before);
        console.log('--- SESUDAH');
        console.log(after);
      }
    }
  }

  console.log(`\nDiblok: ${checked}, gagal: ${failures.length}`);
  if (failures.length > 0) {
    console.log('Gagal:', failures.join(', '));
    process.exitCode = 1;
  } else {
    console.log('Semua blok jaringan lolos round-trip form -> normalizer.');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());