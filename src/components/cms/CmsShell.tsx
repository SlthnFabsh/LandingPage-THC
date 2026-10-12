'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  ScrollText,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Home,
  Images,
  Building2,
  Layers,
  Network,
  Users,
  Handshake,
  HelpCircle,
  PhoneCall,
  Share2,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { logoutAction } from '@/app/cms/actions/auth';
import SubmitButton from '@/components/cms/SubmitButton';
import LoadingOverlay from '@/components/cms/LoadingOverlay';

interface ShellUser {
  name?: string;
  email?: string;
  role?: string;
}

type NavLeaf = {
  type: 'link';
  href: string;
  label: string;
  icon?: LucideIcon;
};

type NavSubGroup = {
  type: 'subgroup';
  key: string;
  label: string;
  icon?: LucideIcon;
  children: NavLeaf[];
};

type NavTopGroup = {
  type: 'group';
  key: string;
  label: string;
  icon: LucideIcon;
  children: (NavLeaf | NavSubGroup)[];
};

type NavEntry = NavLeaf | NavTopGroup;

const navEntries: NavEntry[] = [
  { type: 'link', href: '/cms', label: 'Dashboard', icon: LayoutDashboard },
  { type: 'link', href: '/cms/slider', label: 'Slider', icon: Images },
  {
    type: 'group',
    key: 'tentang',
    label: 'Tentang',
    icon: Building2,
    children: [
      { type: 'link', href: '/cms/profil', label: 'Profil Perusahaan' },
      { type: 'link', href: '/cms/timeline', label: 'Timeline' },
      { type: 'link', href: '/cms/nilai-inti', label: 'Nilai Inti' },
      { type: 'link', href: '/cms/struktur-grup', label: 'Struktur Grup' },
      { type: 'link', href: '/cms/about-hero', label: 'About Hero' },
      { type: 'link', href: '/cms/profil/statistik', label: 'Statistik' },
    ],
  },
  {
    type: 'group',
    key: 'layanan-jaringan',
    label: 'Layanan & Jaringan',
    icon: Layers,
    children: [
      {
        type: 'subgroup',
        key: 'sub-layanan',
        label: 'Layanan',
        icon: Layers,
        children: [
          { type: 'link', href: '/cms/layanan', label: 'Kartu Homepage' },
          { type: 'link', href: '/cms/layanan-halaman', label: 'Halaman Layanan' },
          { type: 'link', href: '/cms/layanan-halaman/menu', label: 'Struktur Menu' },
        ],
      },
      {
        type: 'subgroup',
        key: 'sub-jaringan',
        label: 'Jaringan',
        icon: Network,
        children: [
          { type: 'link', href: '/cms/jaringan', label: 'Halaman Jaringan' },
          { type: 'link', href: '/cms/jaringan/menu', label: 'Struktur Menu' },
        ],
      },
    ],
  },
  { type: 'link', href: '/cms/pelanggan', label: 'Pelanggan', icon: Users },
  { type: 'link', href: '/cms/mitra', label: 'Mitra', icon: Handshake },
  { type: 'link', href: '/cms/faq', label: 'FAQ', icon: HelpCircle },
  { type: 'link', href: '/cms/kontak', label: 'Kontak', icon: PhoneCall },
  { type: 'link', href: '/cms/sosmed', label: 'Sosial Media', icon: Share2 },
  { type: 'link', href: '/cms/news', label: 'Berita', icon: Newspaper },
  { type: 'link', href: '/cms/audit', label: 'Audit Trail', icon: ScrollText },
  { type: 'link', href: '/cms/2fa/setup', label: 'Keamanan 2FA', icon: ShieldCheck },
  { type: 'link', href: '/cms/password', label: 'Ganti Kata Sandi', icon: KeyRound },
];

function getAllHrefs(items: NavEntry[]): string[] {
  const hrefs: string[] = [];
  for (const item of items) {
    if (item.type === 'link') {
      hrefs.push(item.href);
    } else if (item.type === 'group') {
      for (const child of item.children) {
        if (child.type === 'link') {
          hrefs.push(child.href);
        } else if (child.type === 'subgroup') {
          for (const subChild of child.children) {
            hrefs.push(subChild.href);
          }
        }
      }
    }
  }
  return hrefs;
}

const allNavHrefs = getAllHrefs(navEntries);

function isRouteActive(pathname: string, href: string, allHrefs: string[]): boolean {
  if (href === '/cms') {
    return pathname === '/cms';
  }
  const isMatch = pathname === href || pathname.startsWith(href + '/');
  if (!isMatch) return false;

  const hasMoreSpecific = allHrefs.some(
    (other) =>
      other !== href &&
      other.length > href.length &&
      (pathname === other || pathname.startsWith(other + '/'))
  );

  return !hasMoreSpecific;
}

function isSubGroupActive(subgroup: NavSubGroup, pathname: string, allHrefs: string[]): boolean {
  return subgroup.children.some((child) => isRouteActive(pathname, child.href, allHrefs));
}

function isGroupActive(group: NavTopGroup, pathname: string, allHrefs: string[]): boolean {
  return group.children.some((child) => {
    if (child.type === 'link') {
      return isRouteActive(pathname, child.href, allHrefs);
    }
    return isSubGroupActive(child, pathname, allHrefs);
  });
}

export default function CmsShell({
  user,
  passwordExpired,
  children,
}: {
  user: ShellUser | null;
  passwordExpired: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const entry of navEntries) {
      if (entry.type === 'group') {
        if (isGroupActive(entry, pathname, allNavHrefs)) {
          initial[entry.key] = true;
          for (const child of entry.children) {
            if (child.type === 'subgroup' && isSubGroupActive(child, pathname, allNavHrefs)) {
              initial[child.key] = true;
            }
          }
        }
      }
    }
    return initial;
  });

  useEffect(() => {
    for (const entry of navEntries) {
      if (entry.type === 'group') {
        if (isGroupActive(entry, pathname, allNavHrefs)) {
          setOpenGroups((prev) => {
            const updates: Record<string, boolean> = { [entry.key]: true };
            for (const child of entry.children) {
              if (child.type === 'subgroup' && isSubGroupActive(child, pathname, allNavHrefs)) {
                updates[child.key] = true;
              }
            }
            return { ...prev, ...updates };
          });
        }
      }
    }
  }, [pathname]);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!user || pathname === '/cms/login' || pathname === '/cms/login/verify') {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {passwordExpired && (
        <div className="flex items-center gap-3 bg-amber-500 px-6 py-3 text-white">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            Kata sandi Anda telah kedaluwarsa (lebih dari 90 hari). Silakan{' '}
            <Link href="/cms/password" className="font-bold underline underline-offset-2">
              ganti kata sandi
            </Link>{' '}
            untuk melanjutkan seluruh aktivitas.
          </p>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 space-y-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 border-b border-slate-100 px-3 py-2">
              <p className="text-sm font-bold text-slate-900">THC CMS</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{user?.email}</p>
            </div>

            <nav className="space-y-1">
              {navEntries.map((entry) => {
                if (entry.type === 'link') {
                  const Icon = entry.icon ?? ChevronRight;
                  const active = isRouteActive(pathname, entry.href, allNavHrefs);
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {entry.label}
                    </Link>
                  );
                }

                // Level 0 Group (e.g. Data Master / Layanan & Jaringan)
                const Icon = entry.icon;
                const groupActive = isGroupActive(entry, pathname, allNavHrefs);
                const isOpen = Boolean(openGroups[entry.key]);

                return (
                  <div key={entry.key} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(entry.key)}
                      aria-expanded={isOpen}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        groupActive
                          ? 'bg-brand-600 text-white shadow-sm font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {entry.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        } ${groupActive ? 'text-white/80' : 'text-slate-400'}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-1 pt-0.5">
                        {entry.children.map((child) => {
                          // Level 1: Direct link (e.g. Profil Perusahaan di dalam Tentang)
                          if (child.type === 'link') {
                            const childActive = isRouteActive(pathname, child.href, allNavHrefs);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`ml-4 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                                  childActive
                                    ? 'bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-300'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                              >
                                <span>{child.label}</span>
                                <ChevronRight className={`h-3 w-3 ${childActive ? 'text-brand-600' : 'text-slate-400'}`} />
                              </Link>
                            );
                          }

                          // Level 1: Subgroup (e.g. Data Internal / Layanan / Jaringan)
                          const subActive = isSubGroupActive(child, pathname, allNavHrefs);
                          const isSubOpen = Boolean(openGroups[child.key]);
                          const SubIcon = child.icon;

                          return (
                            <div key={child.key} className="ml-4 space-y-1">
                              <button
                                type="button"
                                onClick={() => toggleGroup(child.key)}
                                aria-expanded={isSubOpen}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                                  subActive
                                    ? 'bg-brand-600 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {SubIcon && <SubIcon className="h-3.5 w-3.5" />}
                                  {child.label}
                                </span>
                                <ChevronDown
                                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                    isSubOpen ? 'rotate-180' : ''
                                  } ${subActive ? 'text-white/80' : 'text-slate-400'}`}
                                />
                              </button>

                              {/* Level 2: Nested items inside subgroup (e.g. Data Company / Kartu Homepage) */}
                              {isSubOpen && (
                                <div className="ml-3 space-y-1 border-l-2 border-slate-200/70 py-1 pl-3">
                                  {child.children.map((subChild) => {
                                    const subChildActive = isRouteActive(pathname, subChild.href, allNavHrefs);
                                    return (
                                      <Link
                                        key={subChild.href}
                                        href={subChild.href}
                                        className={`group flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                                          subChildActive
                                            ? 'bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-300'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                      >
                                        <span>{subChild.label}</span>
                                        <ChevronRight
                                          className={`h-3 w-3 transition-transform ${
                                            subChildActive
                                              ? 'text-brand-600'
                                              : 'text-slate-400 group-hover:translate-x-0.5'
                                          }`}
                                        />
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-2 border-t border-slate-100 pt-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Lihat Website
              </Link>
              <form action={logoutAction}>
                <LoadingOverlay />
                <SubmitButton
                  label="Keluar"
                  pendingLabel="Keluar..."
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                />
              </form>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="mb-4 flex items-center gap-4 lg:hidden">
            <p className="text-sm font-bold text-slate-900">THC CMS</p>
            <div className="ml-auto flex items-center gap-2">
              <Link href="/" className="text-xs font-medium text-brand-600">
                Website
              </Link>
              <form action={logoutAction}>
                <LoadingOverlay />
                <SubmitButton
                  label="Keluar"
                  pendingLabel="Keluar..."
                  className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 disabled:opacity-50"
                />
              </form>
            </div>
          </div>

          {/* Mobile Category & Submenu Navigation */}
          <div className="mb-4 space-y-2 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {navEntries.map((entry) => {
                if (entry.type === 'link') {
                  const active = isRouteActive(pathname, entry.href, allNavHrefs);
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                        active ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const groupActive = isGroupActive(entry, pathname, allNavHrefs);
                const firstChild = entry.children[0];
                const targetHref =
                  firstChild?.type === 'link'
                    ? firstChild.href
                    : firstChild?.type === 'subgroup'
                    ? firstChild.children[0]?.href ?? '#'
                    : '#';

                return (
                  <Link
                    key={entry.key}
                    href={targetHref}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      groupActive ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    {entry.label}
                  </Link>
                );
              })}
            </div>

            {/* Submenu bar for the active group */}
            {navEntries.map((entry) => {
              if (entry.type !== 'group') return null;
              if (!isGroupActive(entry, pathname, allNavHrefs)) return null;

              return (
                <div key={`sub-${entry.key}`} className="space-y-1.5">
                  {entry.children.map((child) => {
                    if (child.type === 'link') return null;
                    if (!isSubGroupActive(child, pathname, allNavHrefs)) return null;

                    return (
                      <div
                        key={child.key}
                        className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs"
                      >
                        <span className="shrink-0 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {child.label}:
                        </span>
                        {child.children.map((subChild) => {
                          const childActive = isRouteActive(pathname, subChild.href, allNavHrefs);
                          return (
                            <Link
                              key={subChild.href}
                              href={subChild.href}
                              className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                                childActive
                                  ? 'bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-300'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {subChild.label}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Direct children (e.g. in Tentang) */}
                  {entry.children.some((c) => c.type === 'link') && (
                    <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs">
                      <span className="shrink-0 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {entry.label}:
                      </span>
                      {entry.children.map((child) => {
                        if (child.type !== 'link') return null;
                        const childActive = isRouteActive(pathname, child.href, allNavHrefs);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                              childActive
                                ? 'bg-brand-50 text-brand-700 font-bold ring-1 ring-brand-300'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
