'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, PhoneCall } from 'lucide-react';
import { getServiceIcon } from '@/lib/service-icons';
import type { ServiceMenuNode } from '@/lib/service-content';

/**
 * Sidebar /layanan. Struktur menu datang dari CMS lewat prop `items`
 * (diambil dari tabel ServiceMenuItem pada server).
 */

export default function ServiceSidebar({ items }: { items: ServiceMenuNode[] }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const isBranchActive = (node: ServiceMenuNode): boolean => {
    if (node.href && pathname.startsWith(node.href)) return true;
    return node.children.some(isBranchActive);
  };

  useEffect(() => {
    setOpenSections((prev) => {
      const next = { ...prev };
      items.forEach((node) => {
        if (isBranchActive(node)) next[node.id] = true;
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, items]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  return (
    <aside className="w-full shrink-0 lg:w-72 xl:w-80">
      <div className="sticky top-28 space-y-5">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              SERVICES
            </span>
          </div>

          <nav className="divide-y divide-slate-100/80 py-1" aria-label="Services sub-navigation">
            {items.map((node) => {
              const Icon = getServiceIcon(node.icon);
              const hasChildren = node.children.length > 0;
              const active = isBranchActive(node);
              const isOpen = openSections[node.id] ?? true;

              return (
                <div key={node.id} className="py-1">
                  <div className="flex items-center">
                    {node.href ? (
                      <Link
                        href={node.href}
                        className={`flex min-w-0 flex-1 items-center gap-3.5 py-3.5 pl-5 pr-2 text-[14px] font-medium transition-colors ${
                          active ? 'font-semibold text-brand-600' : 'text-slate-700 hover:text-brand-600'
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            active
                              ? 'bg-brand-600 text-white shadow-glow-blue'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="leading-snug">{node.title}</span>
                      </Link>
                    ) : (
                      <span
                        className={`flex min-w-0 flex-1 items-center gap-3.5 py-3.5 pl-5 pr-2 text-[14px] font-medium ${
                          active ? 'font-semibold text-brand-600' : 'text-slate-700'
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            active ? 'bg-brand-600 text-white shadow-glow-blue' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="leading-snug">{node.title}</span>
                      </span>
                    )}

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => toggleSection(node.id)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? 'Tutup' : 'Buka'} ${node.title}`}
                        className="mr-4 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && isOpen && (
                    <div className="ml-7 mr-3 my-1 space-y-1 border-l-2 border-slate-200 pl-3">
                      {node.children.map((child) => (
                        <SubNavLink key={child.id} node={child} pathname={pathname} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 via-white to-blue-50/50 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Enterprise Support
              </p>
              <p className="text-sm font-bold text-slate-800">0811-1222-808</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
            24/7 Network Operations Center (NOC) and technical enterprise consultation.
          </p>
          <a
            href="/#faq"
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            <span>Help Center &amp; FAQ</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}

function SubNavLink({ node, pathname }: { node: ServiceMenuNode; pathname: string }) {
  const [open, setOpen] = useState(true);
  const Icon = getServiceIcon(node.icon);
  const hasChildren = node.children.length > 0;

  if (!node.href && !hasChildren) return null;

  return (
    <div>
      {node.href && (
        <Link
          href={node.href}
          className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
            pathname === node.href
              ? 'bg-brand-50 font-semibold text-brand-600 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
          }`}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Icon
              className={`h-3.5 w-3.5 shrink-0 ${
                pathname === node.href ? 'text-brand-600' : 'text-slate-400'
              }`}
            />
            <span className="leading-snug">{node.title}</span>
          </span>
          <ArrowRight
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
              pathname === node.href
                ? 'translate-x-0 text-brand-600 opacity-100'
                : '-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
            }`}
          />
        </Link>
      )}

      {hasChildren && (
        <>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
              node.href ? '' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
            }`}
          >
            {!node.href && (
              <>
                <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="flex-1 text-left leading-snug">{node.title}</span>
              </>
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
                open ? 'rotate-180' : ''
              } ${node.href ? 'ml-auto' : ''}`}
            />
          </button>

          {open && (
            <div className="my-1 ml-4 space-y-1 border-l-2 border-slate-200 pl-3">
              {node.children.map((child) => (
                <SubNavLink key={child.id} node={child} pathname={pathname} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
