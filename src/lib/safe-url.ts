/**
 * Validasi URL untuk konten CMS (pertahanan berlapis terhadap XSS).
 *
 * Konten CMS dirender sebagai teks oleh React sehingga sudah ter-escape, tapi
 * field URL (href/src) bisa berisi skema berbahaya seperti `javascript:` bila
 * admin (atau akun yang dibajak) menempelkannya. Helper ini menolak skema di
 * luar allowlist.
 */

export interface SafeUrlOptions {
  /** Izinkan data URL gambar (base64), dipakai untuk hasil upload CMS. */
  allowDataImage?: boolean;
  /** Izinkan tautan mailto:. */
  allowMailto?: boolean;
  /** Izinkan tautan tel:. */
  allowTel?: boolean;
}

const DATA_IMAGE_PATTERN =
  /^data:image\/(png|jpe?g|gif|webp|avif|x-icon|vnd\.microsoft\.icon);base64,[a-z0-9+/=\s]+$/i;

/**
 * `true` bila URL aman dipakai pada atribut href/src.
 *
 * Aturan:
 * - Skema yang diizinkan hanya http, https (dan mailto/tel bila diminta).
 * - Path relatif (`/layanan/foo`, `#faq`) diperbolehkan.
 * - Data URL hanya untuk gambar bila `allowDataImage` diset.
 * - Karakter kontrol/whitespace dihapus dulu agar trik seperti
 *   `java\tscript:` tidak lolos.
 */
export function isSafeUrl(value: string | null | undefined, options: SafeUrlOptions = {}): boolean {
  const raw = (value ?? '').trim();
  if (!raw) return false;

  const collapsed = raw.replace(/[\u0000-\u0020\u007f]/g, '');
  if (!collapsed) return false;

  const lower = collapsed.toLowerCase();

  if (lower.startsWith('data:')) {
    return options.allowDataImage === true && DATA_IMAGE_PATTERN.test(collapsed);
  }
  if (lower.startsWith('mailto:')) return options.allowMailto === true;
  if (lower.startsWith('tel:')) return options.allowTel === true;

  const scheme = lower.match(/^([a-z][a-z0-9+.-]*):/);
  if (scheme && scheme[1] !== 'http' && scheme[1] !== 'https') return false;

  // Protocol-relative (`//evil.com`) ditolak; path relatif biasa tetap boleh.
  if (collapsed.startsWith('//')) return false;

  return true;
}

/** Mengembalikan URL bila aman, atau `''` bila tidak. */
export function sanitizeUrl(
  value: string | null | undefined,
  options: SafeUrlOptions = {}
): string {
  const raw = (value ?? '').trim();
  return isSafeUrl(raw, options) ? raw : '';
}

/** URL tautan (href): http/https, relatif, mailto, tel. */
export function sanitizeLinkUrl(value: string | null | undefined): string {
  return sanitizeUrl(value, { allowMailto: true, allowTel: true });
}

/** URL gambar (src): http/https, relatif, atau data URL gambar. */
export function sanitizeImageUrl(value: string | null | undefined): string {
  return sanitizeUrl(value, { allowDataImage: true });
}
