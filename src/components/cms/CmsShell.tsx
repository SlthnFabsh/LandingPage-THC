'use client';

import Link from 'next/link';
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
  Users,
  Handshake,
  HelpCircle,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { logoutAction } from '@/app/cms/actions/auth';
import SubmitButton from '@/components/cms/SubmitButton';

interface ShellUser {
  name?: string;
  email?: string;
  role?: string;
}

const navItems = [
  { href: '/cms', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cms/slider', label: 'Slider', icon: Images },
  { href: '/cms/profil', label: 'Profil Perusahaan', icon: Building2 },
  { href: '/cms/profil/statistik', label: 'Statistik', icon: LayoutDashboard },
  { href: '/cms/layanan', label: 'Layanan', icon: Layers },
  { href: '/cms/pelanggan', label: 'Pelanggan', icon: Users },
  { href: '/cms/mitra', label: 'Mitra', icon: Handshake },
  { href: '/cms/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/cms/kontak', label: 'Kontak', icon: PhoneCall },
  { href: '/cms/sosmed', label: 'Sosial Media', icon: Share2 },
  { href: '/cms/news', label: 'Berita', icon: Newspaper },
  { href: '/cms/audit', label: 'Audit Trail', icon: ScrollText },
  { href: '/cms/2fa/setup', label: 'Keamanan 2FA', icon: ShieldCheck },
  { href: '/cms/password', label: 'Ganti Kata Sandi', icon: KeyRound },
];

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
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 space-y-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 border-b border-slate-100 px-3 py-2">
              <p className="text-sm font-bold text-slate-900">THC CMS</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{user?.email}</p>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === '/cms'
                  ? pathname === '/cms'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 border-t border-slate-100 pt-2">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Lihat Website
              </Link>
              <form action={logoutAction}>
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
                <SubmitButton
                  label="Keluar"
                  pendingLabel="Keluar..."
                  className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 disabled:opacity-50"
                />
              </form>
            </div>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => {
              const active =
                item.href === '/cms'
                  ? pathname === '/cms'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold ${
                    active ? 'bg-brand-600 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
