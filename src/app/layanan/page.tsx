import { redirect } from 'next/navigation';
import { getFirstServiceHref } from '@/lib/service-content';

export const revalidate = 60;

/** /layanan selalu mengarah ke halaman layanan pertama yang aktif di CMS. */
export default async function LayananIndexPage() {
  redirect(await getFirstServiceHref());
}
