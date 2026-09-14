import type { JSX } from 'react';

export type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
  data?: JsonLdData | JsonLdData[];
  id?: string;
  className?: string;
}

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stringify = (input: unknown): string => {
  const seen = new Set<unknown>();
  return JSON.stringify(input, (_key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }
    return value;
  });
};

export default function JsonLd({ data, id }: JsonLdProps): JSX.Element {
  if (!data) return <></>;
  const raw = stringify(data);
  const encoded = escapeHtml(raw);
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: encoded }} />;
}
