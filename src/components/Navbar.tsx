import NavbarClient from '@/components/NavbarClient';
import { getServiceNavbarItems } from '@/lib/service-content';

/**
 * Server wrapper untuk Navbar. Item dropdown "Layanan" diambil dari CMS
 * (tabel ServiceMenuItem) sehingga admin bisa mengubahnya tanpa deploy.
 * Semua halaman cukup mengimpor '@/components/Navbar' seperti sebelumnya.
 */
export default async function Navbar() {
  const layananItems = await getServiceNavbarItems();

  return <NavbarClient layananItems={layananItems} />;
}
