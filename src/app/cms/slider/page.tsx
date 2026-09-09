import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireCms } from '@/lib/cms-auth';
import DeleteContentButton from '@/components/cms/DeleteContentButton';
import { deleteHeroSlide } from '@/app/cms/actions/content';
import { ListHeader, ListCard, Row, EmptyState, ActiveBadge, PasswordExpiredBanner } from '@/components/cms/ListShell';

export const dynamic = 'force-dynamic';

export default async function SliderListPage() {
  const { passwordExpired } = await requireCms();
  const slides = await prisma.heroSlide.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="space-y-6">
      <ListHeader
        title="Slider (Hero)"
        subtitle="Slide di bagian paling atas halaman utama."
        addHref="/cms/slider/new"
        addLabel="Tambah Slide"
      />
      {passwordExpired && <PasswordExpiredBanner />}
      {slides.length === 0 ? (
        <EmptyState message="Belum ada slide. Tambahkan slide pertama Anda." />
      ) : (
        <ListCard>
          {slides.map((slide) => (
            <Row key={slide.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt=""
                className="h-14 w-24 shrink-0 rounded-lg bg-slate-100 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Urutan {slide.order}</span>
                  <ActiveBadge active={slide.active} />
                </div>
                <Link
                  href={`/cms/slider/${slide.id}/edit`}
                  className="block truncate text-sm font-semibold text-slate-900 hover:text-brand-600"
                >
                  {slide.titleId}
                </Link>
                <p className="truncate text-xs text-slate-500">{slide.titleEn}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/cms/slider/${slide.id}/edit`}
                  title="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteContentButton action={deleteHeroSlide} id={slide.id} disabled={passwordExpired} confirmText="Hapus slide ini?" />
              </div>
            </Row>
          ))}
        </ListCard>
      )}
    </div>
  );
}