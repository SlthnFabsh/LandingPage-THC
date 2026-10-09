import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from '../src/lib/mariadb-conn';

const connectionString = process.env.DATABASE_URL as string;
const config = mariadbPoolConfigFromUrl(connectionString);
const adapter = config ? new PrismaMariaDb(config) : new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function printTable(label: string, rows: unknown[] | null, pick: (r: Record<string, unknown>) => string) {
  console.log(`\n=== ${label} =====`);
  if (!rows || rows.length === 0) {
    console.log('  (kosong)');
    return;
  }
  for (const row of rows) console.log('  - ' + pick(row as Record<string, unknown>));
}

async function main() {
  await printTable('aboutPage', await prisma.aboutPage.findMany(), (r) => `${r.key}: "${r.titleEn}" / "${r.subtitleEn}"`);
  await printTable('milestone', await prisma.milestone.findMany({ orderBy: [{ order: 'asc' }] }), (r) => `${r.year} -> "${r.titleEn}" (${(r.pointsEn as string[] | null)?.length ?? 0} pts)`);
  await printTable('coreValue', await prisma.coreValue.findMany({ orderBy: [{ order: 'asc' }] }), (r) => `${r.letter} -> "${r.titleEn}"`);
  await printTable('coreValueSetting', await prisma.coreValueSetting.findMany(), (r) => `introEn: "${String(r.introEn).slice(0, 60)}..."`);
  await printTable('groupStructure', await prisma.groupStructure.findMany(), (r) => `${r.parentName} | badge: "${r.parentBadge}" | child: ${r.child1Name}/${r.child2Name}`);
}

main()
  .catch((e) => {
    console.error('Verify error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());