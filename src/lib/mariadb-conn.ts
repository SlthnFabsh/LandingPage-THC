import type { PoolConfig } from 'mariadb';

// The adapter bundles its own mariadb copy whose `PoolConfig` type conflicts with the
// top-level `mariadb` package, so we keep the config structural here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MariaDbAdapterConfig = any;

export function mariadbPoolConfigFromUrl(connectionString: string): MariaDbAdapterConfig | null {
  try {
    const url = new URL(connectionString);
    return {
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, '') || undefined,
      ssl: { rejectUnauthorized: false },
      allowPublicKeyRetrieval: true,
      connectTimeout: 10000,
    } satisfies PoolConfig;
  } catch {
    return null;
  }
}