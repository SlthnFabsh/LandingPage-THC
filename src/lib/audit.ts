import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import type { AuditAction } from '@/generated/prisma/enums';

export async function getRequestMeta() {
  const headerStore = await headers();
  const forwarded = headerStore.get('x-forwarded-for');
  const ipAddress =
    forwarded?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    'unknown';
  const userAgent = headerStore.get('user-agent') || 'unknown';
  return { ipAddress, userAgent };
}

export async function writeAudit(
  action: AuditAction,
  opts: {
    userId?: string | null;
    entity?: string;
    entityId?: string;
    detail?: string;
  } = {}
) {
  try {
    const { ipAddress, userAgent } = await getRequestMeta();
    return await prisma.auditLog.create({
      data: {
        userId: opts.userId ?? null,
        action,
        entity: opts.entity ?? null,
        entityId: opts.entityId ?? null,
        detail: opts.detail ?? null,
        ipAddress,
        userAgent,
      },
    });
  } catch {
    return null;
  }
}
