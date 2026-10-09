import { Fragment } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getServiceIcon } from '@/lib/service-icons';
import { cellToLines } from '@/lib/service-blocks';
import BlockShell from './BlockShell';
import ZoomableImage from './ZoomableImage';
import type {
  BadgesData,
  CtaData,
  FeaturesData,
  ImageData,
  IntroData,
  MetricsData,
  ProcessData,
  TableData,
} from '@/lib/service-blocks';

/**
 * Blok yang sepenuhnya statis. Semua komponen di file ini adalah Server
 * Component sehingga tidak ada JS yang dikirim ke browser untuk blok ini.
 */

export function IntroBlock({ data }: { data: IntroData }) {
  const Icon = getServiceIcon('Globe');

  return (
    <BlockShell>
      <div className="border-b border-slate-100 pb-8">
        <div className="flex items-center gap-3 text-brand-600">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            {data.title && (
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">{data.title}</h2>
            )}
            {data.eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {data.eyebrow}
              </span>
            )}
          </div>
        </div>

        {data.body && (
          <p className="mt-5 text-[15px] leading-[1.85] text-slate-600 sm:text-[16px]">{data.body}</p>
        )}
      </div>

      {data.image && (
        <div className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.imageAlt || data.title}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
          />
        </div>
      )}
    </BlockShell>
  );
}

export function BadgesBlock({ data }: { data: BadgesData }) {
  if (data.items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {data.items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function MetricsBlock({ data }: { data: MetricsData }) {
  if (data.items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {data.items.map((metric) => (
        <div
          key={`${metric.value}-${metric.label}`}
          className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-brand-50/60 to-white p-5 text-center"
        >
          <div className="bg-gradient-to-r from-brand-600 to-sky-500 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
            {metric.value}
          </div>
          <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturesBlock({ data }: { data: FeaturesData }) {
  if (data.items.length === 0) return null;

  return (
    <div>
      {data.heading && (
        <h3 className="mb-4 text-lg font-bold text-slate-900">{data.heading}</h3>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {data.items.map((item) => {
          const Icon = getServiceIcon(item.icon);
          return (
            <div
              key={`${item.title}-${item.icon}`}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors hover:border-brand-200"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="mt-4 text-base font-bold text-slate-900">{item.title}</h4>
              {item.desc && <p className="mt-1.5 text-[14px] leading-[1.8] text-slate-600">{item.desc}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProcessBlock({ data }: { data: ProcessData }) {
  if (data.items.length === 0) return null;

  return (
    <div>
      {data.heading && <h3 className="mb-4 text-lg font-bold text-slate-900">{data.heading}</h3>}
      <div className="space-y-4">
        {data.items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
              {item.desc && <p className="mt-1 text-[14px] leading-[1.8] text-slate-600">{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImageBlock({ data }: { data: ImageData }) {
  if (!data.src) return null;

  if (data.zoomable) {
    return (
      <figure className="rounded-2xl border border-slate-200/80 bg-white shadow-soft">
        <ZoomableImage src={data.src} alt={data.alt} />
        {data.caption && (
          <figcaption className="px-4 py-3 text-center text-[12px] text-slate-500">{data.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft sm:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.src}
        alt={data.alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-xl object-contain"
      />
      {data.caption && (
        <figcaption className="mt-3 text-center text-[12px] text-slate-500">{data.caption}</figcaption>
      )}
    </figure>
  );
}

export function CtaBlock({ data }: { data: CtaData }) {
  if (!data.title) return null;

  return (
    <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h4 className="text-lg font-bold text-slate-900">{data.title}</h4>
          {data.description && <p className="mt-1 text-sm text-slate-600">{data.description}</p>}
        </div>
        <Link
          href={data.href || '/#faq'}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-glow-blue transition-all hover:bg-brand-700"
        >
          <span>{data.label}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function TableBlock({ data }: { data: TableData }) {
  if (data.columns.length === 0) return null;

  const columnCount = data.columns.length + 1;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b border-slate-200 bg-slate-50 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              Detail
            </th>
            {data.columns.map((column) => (
              <th
                key={column.key}
                className={`border-b border-slate-200 px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider ${
                  column.highlight ? 'bg-brand-600 text-white' : 'text-slate-700'
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.rows.map((row) => (
            <Fragment key={row.key}>
              <tr className="border-b border-slate-100">
                <td className="px-5 py-4 align-top font-semibold text-slate-700">{row.label}</td>
                {data.columns.map((column, index) => {
                  const lines = cellToLines(row.cells[index] ?? '');
                  return (
                    <td
                      key={`${row.key}-${column.key}`}
                      className="px-5 py-4 text-left text-xs leading-relaxed text-slate-600"
                    >
                      {lines.length > 1 ? (
                        <ol className="list-decimal list-inside space-y-0.5">
                          {lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ol>
                      ) : (
                        lines[0]
                      )}
                    </td>
                  );
                })}
              </tr>

              {(row.footnotes?.length ?? 0) > 0 && (
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <td colSpan={columnCount} className="px-5 py-3 text-[11px] leading-relaxed text-slate-500">
                    {row.footnotes?.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>

        {(data.footnotes?.length ?? 0) > 0 && (
          <tfoot>
            <tr className="bg-slate-50">
              <td colSpan={columnCount} className="px-5 py-4 text-[11px] leading-relaxed text-slate-500">
                {data.footnotes?.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
