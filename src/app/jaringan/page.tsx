import { redirect } from 'next/navigation';
import { getFirstNetworkHref } from '@/lib/network-content';

export const revalidate = 60;

/** /jaringan selalu mengarah ke halaman jaringan pertama yang aktif di CMS. */
export default async function JaringanIndexPage() {
  redirect(await getFirstNetworkHref());
}