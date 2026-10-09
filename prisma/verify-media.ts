import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from '../src/lib/mariadb-conn';

const connectionString = process.env.DATABASE_URL as string;
const config = mariadbPoolConfigFromUrl(connectionString);
const adapter = config ? new PrismaMariaDb(config) : new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

const REQUIRED_FIELDS = ['faqThumb1', 'faqThumb2', 'ctaBackground', 'ctaLogo'] as const;

async function main() {
  const media = await prisma.homeMedia.findFirst();
  if (!media) {
    console.error('✗ HomeMedia tidak ditemukan. Jalankan: npm run db:seed');
    process.exit(1);
  }

  const missing = REQUIRED_FIELDS.filter((field) => !media[field]);
  console.log(`✓ Baris HomeMedia: ${media.id}`);

  if (missing.length > 0) {
    console.error(`✗ Field kosong: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('✓ Semua field media halaman terisi:');
  console.log(`  - FAQ Thumbnail #1: ${media.faqThumb1}`);
  console.log(`  - FAQ Thumbnail #2: ${media.faqThumb2}`);
  console.log(`  - Background CTA: ${media.ctaBackground}`);
  console.log(`  - Logo CTA: ${media.ctaLogo}`);
}

main()
  .catch((e) => {
    console.error('Verify error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());