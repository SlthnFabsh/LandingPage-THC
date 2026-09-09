import Link from 'next/link';
import {
  Newspaper,
  Eye,
  PenLine,
  ScrollText,
  Images,
  Building2,
  Layers,
  Users,
  Handshake,
  HelpCircle,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { start2faAction } from '@/app/cms/actions/twofa';
import SubmitButton from '@/components/cms/SubmitButton';
import LoadingOverlay from '@/components/cms/LoadingOverlay';

export const dynamic = 'force-dynamic';

export default async function CmsDashboardPage() {
  const user = await getCurrentUser();
  const [
    totalNews,
    publishedNews,
    totalAudit,
    totalSlides,
    totalServices,
    totalProducts,
    totalPartners,
    totalFaqs,
    totalSocials,
    recentAudits,
  ] = await Promise.all([
    prisma.newsPost.count(),
    prisma.newsPost.count({ where: { published: true } }),
    prisma.auditLog.count(),
    prisma.heroSlide.count(),
    prisma.serviceItem.count(),
    prisma.customerLogo.count(),
    prisma.partnerLogo.count(),
    prisma.faqEntry.count(),
    prisma.socialMediaLink.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { user: { select: { email: true } } },
    }),
  ]);

  const needs2fa = user ? !user.is2faEnabled : false;

  const quickSections = [
    { href: '/cms/slider', label: 'Slider', count: totalSlides, icon: Images },
    { href: '/cms/profil', label: 'Profil', icon: Building2 },
    { href: '/cms/layanan', label: 'Layanan', count: totalServices, icon: Layers },
    { href: '/cms/pelanggan', label: 'Pelanggan', count: totalProducts, icon: Users },
    { href: '/cms/mitra', label: 'Mitra', count: totalPartners, icon: Handshake },
    { href: '/cms/faq', label: 'FAQ', count: totalFaqs, icon: HelpCircle },
    { href: '/cms/kontak', label: 'Kontak', icon: PhoneCall },
    { href: '/cms/sosmed', label: 'Sosial Media', count: totalSocials, icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Halo, {user?.name ?? user?.email}
          </h1>
          <p className="text-sm text-slate-500">Ringkasan konten situs Anda.</p>
        </div>
        {needs2fa && (
          <form action={start2faAction}>
            <LoadingOverlay />
            <SubmitButton
              label="Aktifkan 2FA Sekarang"
              pendingLabel="Menyiapkan..."
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
            />
          </form>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-400"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-slate-900">
                {section.count ?? '—'}
              </p>
              <p className="text-sm text-slate-500">{section.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
            <Newspaper className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalNews}</p>
          <p className="text-sm text-slate-500">Total Berita</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-600">
            <Eye className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{publishedNews}</p>
          <p className="text-sm text-slate-500">Berita Terbit</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600/10 text-sky-600">
            <ScrollText className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalAudit}</p>
          <p className="text-sm text-slate-500">Catatan Audit</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/cms/news/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <PenLine className="h-4 w-4" />
          Tambah Berita
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-bold text-slate-900">Aktivitas Terbaru</h2>
        </div>
        {recentAudits.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">
            Belum ada aktivitas tercatat.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentAudits.map((log) => (
              <li key={log.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{log.action}</p>
                  <p className="truncate text-xs text-slate-500">{log.detail ?? '—'}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {new Date(log.createdAt).toLocaleString('id-ID')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}