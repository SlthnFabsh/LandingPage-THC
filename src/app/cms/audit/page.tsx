import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 25;

function formatDateTime(d: Date): string {
  return new Date(d).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } },
    }),
    prisma.auditLog.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Trail</h1>
        <p className="text-sm text-slate-500">
          Catatan seluruh aktivitas yang terjadi di sistem ({total} entri).
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {logs.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">Tidak ada catatan.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Waktu</th>
                <th className="px-4 py-3 font-semibold">Tindakan</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Detail</th>
                <th className="px-4 py-3 font-semibold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {formatDateTime(log.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{log.user?.email ?? 'Sistem'}</td>
                  <td className="px-4 py-3 text-slate-600">{log.detail ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Halaman {page} dari {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <a
                href={`/cms/audit?page=${page - 1}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-600 hover:bg-slate-50"
              >
                Sebelumnya
              </a>
            )}
            {page < totalPages && (
              <a
                href={`/cms/audit?page=${page + 1}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-600 hover:bg-slate-50"
              >
                Berikutnya
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}