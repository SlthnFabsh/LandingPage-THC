/**
 * Definisi tipe blok konten untuk halaman /layanan.
 *
 * Bentuk data disimpan pada kolom `ServiceSection.data` (Json) dan dinormalisasi
 * ulang oleh `normalizeBlock()` setiap kali dibaca. Dengan begitu data rusak
 * atau versi lama tidak akan membuat halaman gagal render.
 */

export const BLOCK_TYPES = [
  'INTRO',
  'BADGES',
  'METRICS',
  'FEATURES',
  'CARDS',
  'TABS',
  'TABLE',
  'PROCESS',
  'IMAGE',
  'CTA',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

/** Label bahasa Indonesia untuk ditampilkan di CMS. */
export const BLOCK_LABELS: Record<BlockType, string> = {
  INTRO: 'Teks Pembuka',
  BADGES: 'Lencana',
  METRICS: 'Angka Statistik',
  FEATURES: 'Daftar Fitur',
  CARDS: 'Kartu Layanan',
  TABS: 'Tab',
  TABLE: 'Tabel',
  PROCESS: 'Alur Proses',
  IMAGE: 'Gambar',
  CTA: 'Ajakan Bertindak',
};

export interface IntroData {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
}

export interface BadgesData {
  items: string[];
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface MetricsData {
  items: MetricItem[];
}

export interface FeatureItem {
  title: string;
  desc?: string;
  icon: string;
}

export interface FeaturesData {
  heading?: string;
  items: FeatureItem[];
}

export interface CardItem {
  title: string;
  shortTitle?: string;
  badge?: string;
  icon: string;
  description: string;
  features: string[];
  href: string;
  ctaLabel?: string;
}

export interface CardsData {
  style: 'accordion' | 'grid';
  items: CardItem[];
}

export interface TableColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

export interface TableRow {
  key: string;
  label: string;
  cells: string[];
  footnotes?: string[];
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  footnotes?: string[];
}

export interface ProcessItem {
  title: string;
  desc: string;
}

export interface ProcessData {
  heading?: string;
  items: ProcessItem[];
}

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  /** Bisa diperbesar dengan tombol zoom (dipakai peta/skema jaringan). */
  zoomable?: boolean;
}

export interface CtaData {
  title: string;
  description?: string;
  label: string;
  href: string;
}

export type BlockData =
  | IntroData
  | BadgesData
  | MetricsData
  | FeaturesData
  | CardsData
  | TableData
  | ProcessData
  | ImageData
  | CtaData
  | TabsData;

export interface TabItem {
  label: string;
  blocks: ServiceBlock[];
}

export interface TabsData {
  items: TabItem[];
}

export interface ServiceBlock {
  type: BlockType;
  data: BlockData;
}

/* ------------------------------------------------------------------ */
/* Normalizer                                                          */
/* ------------------------------------------------------------------ */

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Daftar teks. Selain array, bentuk teks multi-baris juga diterima karena
 * editor CMS memakai textarea "satu butir per baris" untuk daftar pendek
 * (lencana, poin kartu, sel tabel, catatan).
 */
function strList(value: unknown): string[] {
  if (typeof value === 'string') return cellToLines(value);
  if (!Array.isArray(value)) return [];
  return value.map((item) => str(item)).filter((item) => item.trim() !== '');
}

/**
 * Sel tabel dapat berisi beberapa butir. Aturan tunggal untuk admin:
 * satu baris = satu butir (baris baru di dalam textarea).
 */
export function cellToLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
    .filter((line) => line !== '');
}

function isBlockType(value: unknown): value is BlockType {
  return typeof value === 'string' && (BLOCK_TYPES as readonly string[]).includes(value);
}

function normalizeTabItem(value: unknown): TabItem {
  const raw = record(value);
  const children = Array.isArray(raw.blocks) ? raw.blocks : [];
  return {
    label: str(raw.label),
    blocks: children.map(normalizeBlock).filter((block): block is ServiceBlock => block !== null),
  };
}

export function normalizeBlock(value: unknown): ServiceBlock | null {
  const raw = record(value);
  const type = raw.type;
  const input = raw.data ?? raw;
  const data = record(input);

  if (!isBlockType(type)) return null;

  switch (type) {
    case 'INTRO':
      return {
        type,
        data: {
          eyebrow: str(data.eyebrow) || undefined,
          title: str(data.title),
          body: str(data.body) || undefined,
          image: str(data.image) || undefined,
          imageAlt: str(data.imageAlt) || undefined,
        },
      };

    case 'BADGES':
      return { type, data: { items: strList(data.items) } };

    case 'METRICS':
      return {
        type,
        data: {
          items: (Array.isArray(data.items) ? data.items : []).map((item) => {
            const metric = record(item);
            return { value: str(metric.value), label: str(metric.label) };
          }),
        },
      };

    case 'FEATURES':
      return {
        type,
        data: {
          heading: str(data.heading) || undefined,
          items: (Array.isArray(data.items) ? data.items : []).map((item) => {
            const feature = record(item);
            return {
              title: str(feature.title),
              desc: str(feature.desc) || undefined,
              icon: str(feature.icon) || 'Sparkles',
            };
          }),
        },
      };

    case 'CARDS':
      return {
        type,
        data: {
          style: data.style === 'grid' ? 'grid' : 'accordion',
          items: (Array.isArray(data.items) ? data.items : []).map((item) => {
            const card = record(item);
            return {
              title: str(card.title),
              shortTitle: str(card.shortTitle) || undefined,
              badge: str(card.badge) || undefined,
              icon: str(card.icon) || 'Layers',
              description: str(card.description),
              features: strList(card.features),
              href: str(card.href),
              ctaLabel: str(card.ctaLabel) || undefined,
            };
          }),
        },
      };

    case 'TABS':
      return {
        type,
        data: { items: (Array.isArray(data.items) ? data.items : []).map(normalizeTabItem) },
      };

    case 'TABLE':
      return {
        type,
        data: {
          columns: (Array.isArray(data.columns) ? data.columns : []).map((item) => {
            const column = record(item);
            return {
              key: str(column.key),
              label: str(column.label),
              highlight: column.highlight === true,
            };
          }),
          rows: (Array.isArray(data.rows) ? data.rows : []).map((item) => {
            const row = record(item);
            return {
              key: str(row.key),
              label: str(row.label),
              cells: strList(row.cells),
              footnotes: strList(row.footnotes),
            };
          }),
          footnotes: strList(data.footnotes),
        },
      };

    case 'PROCESS':
      return {
        type,
        data: {
          heading: str(data.heading) || undefined,
          items: (Array.isArray(data.items) ? data.items : []).map((item) => {
            const step = record(item);
            return { title: str(step.title), desc: str(step.desc) };
          }),
        },
      };

    case 'IMAGE':
      return {
        type,
        data: {
          src: str(data.src),
          alt: str(data.alt),
          caption: str(data.caption) || undefined,
          zoomable: data.zoomable === true,
        },
      };

    case 'CTA':
      return {
        type,
        data: {
          title: str(data.title),
          description: str(data.description) || undefined,
          label: str(data.label),
          href: str(data.href) || '/#faq',
        },
      };

    default:
      return null;
  }
}

export function normalizeBlocks(value: unknown): ServiceBlock[] {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeBlock).filter((block): block is ServiceBlock => block !== null);
}
