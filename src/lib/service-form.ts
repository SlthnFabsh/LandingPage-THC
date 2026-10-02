import { normalizeBlock, BLOCK_TYPES, type BlockData, type BlockType } from '@/lib/service-blocks';

/**
 * Utilitas pembacaan form untuk editor blok konten.
 *
 * Nama input di CMS memakai path sederhana, misalnya:
 *   data.items[0].title
 *   data.items[0].blocks[1].data.src
 *
 * `readFormTree()` mengubah semua key tersebut kembali menjadi objek/array
 * yang persis mengikuti bentuk `BlockData`, lalu `normalizeBlock()` dipakai
 * sebagai penjaga terakhir. Jadi data yang tersimpan ke database selalu
 * valid menurut renderer, apa pun input admin.
 */

/**
 * Membangun nama input dari path data.
 *
 * Dipakai editor dan test sekaligus supaya nama field tidak pernah berbeda:
 *   fieldName('data', 'items', 0, 'title')        -> data.items[0][title]
 *   fieldName('data', 'items', 0, 'blocks', 0, 'data', 'src')
 *                                                -> data.items[0].blocks[0].data.src
 */
export function fieldName(prefix: string, ...path: (string | number)[]): string {
  return path.reduce<string>((acc, part) => {
    if (typeof part === 'number') return `${acc}[${part}]`;
    return /\[\d+\]$/.test(acc) ? `${acc}[${part}]` : `${acc}.${part}`;
  }, prefix);
}

/**
 * Mengubah nama input menjadi daftar token.
 *
 * Mendukung dua penulisan, keduanya dipakai di editor:
 *   data.items[0].title      -> data, items, 0, title
 *   data.items[0][title]     -> data, items, 0, title
 *   data.rows[1].cells[0]    -> data, rows, 1, cells, 0
 */
function tokenize(key: string): string[] {
  const tokens: string[] = [];
  const pattern = /[^.[\]]+|\[([^[\]]*)\]/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(key)) !== null) {
    const token = match[1] !== undefined ? match[1] : match[0];
    if (token !== '') tokens.push(token);
  }

  return tokens;
}

function cast(value: string): string | boolean {
  if (value === 'on') return true;
  if (value === '__off__') return false;
  return value;
}

function assign(root: Record<string, unknown>, tokens: string[], value: string): void {
  let node: Record<string, unknown> | unknown[] = root;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const isLast = i === tokens.length - 1;
    const nextIsIndex = !isLast && /^\d+$/.test(tokens[i + 1]);
    const child = (node as Record<string, unknown>)[token];

    if (isLast) {
      (node as Record<string, unknown>)[token] = cast(value);
      return;
    }

    if (child === undefined || child === null) {
      (node as Record<string, unknown>)[token] = nextIsIndex ? [] : {};
    }

    node = (node as Record<string, unknown>)[token] as Record<string, unknown> | unknown[];
  }
}

/** Membangun objek dari seluruh key FormData yang berada di bawah `prefix`. */
export function readFormTree(formData: FormData, prefix: string): Record<string, unknown> {
  const root: Record<string, unknown> = {};

  for (const [key, raw] of formData.entries()) {
    if (typeof raw !== 'string') continue;
    const tokens = tokenize(key);
    if (tokens[0] !== prefix) continue;
    assign(root, tokens, raw);
  }

  const result = root[prefix];
  return result && typeof result === 'object' && !Array.isArray(result)
    ? (result as Record<string, unknown>)
    : {};
}

export function readText(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim();
}

export function readNumber(formData: FormData, key: string, fallback = 0): number {
  const value = Number(readText(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

export function readChecked(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on';
}

export function isBlockTypeValue(value: string): value is BlockType {
  return (BLOCK_TYPES as readonly string[]).includes(value);
}

/**
 * Slug halaman layanan: beberapa segment dipisah garis miring,
 * tiap segment hanya huruf kecil, angka, dan tanda hubung di tengah.
 * Contoh: internet/ip-transit, pusat-data/thc-cloud
 */
const SERVICE_SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/;

export function isServiceSlug(value: string): boolean {
  return SERVICE_SLUG_PATTERN.test(value);
}

/** Membaca data satu blok dari form dan memastikannya valid. */
export function readBlockData(
  formData: FormData,
  type: BlockType,
  prefix: string
): BlockData {
  const tree = readFormTree(formData, prefix);
  const block = normalizeBlock({ type, data: tree });
  if (!block) throw new Error(`Blok "${type}" tidak valid.`);
  return block.data;
}
