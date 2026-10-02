import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/prisma/client';
import { mariadbPoolConfigFromUrl } from './mariadb-conn';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Klien Prisma dibuat saat pertama kali dipakai, bukan saat modul diimpor.
 *
 * Alasannya: `new PrismaMariaDb(undefined)` melempar error kalau `DATABASE_URL`
 * belum ter-set. Karena sebelumnya pembuatan klien berjalan di tingkat modul,
 * satu env var yang hilang bisa membuat seluruh halaman error sekaligus.
 * Dengan cara ini errornya baru muncul di query yang benar-benar menyentuh
 * database, sehingga pemanggil bisa memakai `.catch(() => ...)` seperti biasa
 * dan halaman tetap degrade ke konten cadangan.
 */
function createLazyClient(): PrismaClient {
  let real: PrismaClient | null = null;

  const resolve = () => {
    real ??= buildClient();
    return real;
  };

  return new Proxy({} as PrismaClient, {
    get: (_target, property, receiver) => Reflect.get(resolve(), property, receiver),
    has: (_target, property) => Reflect.has(resolve(), property),
  });
}

function buildClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL belum diatur di environment server.');
  }

  const config = mariadbPoolConfigFromUrl(connectionString);
  const adapter = config ? new PrismaMariaDb(config) : new PrismaMariaDb(connectionString);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createLazyClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
