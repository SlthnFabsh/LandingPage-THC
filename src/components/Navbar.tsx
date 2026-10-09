import NavbarClient from '@/components/NavbarClient';
import { getServiceNavbarItems } from '@/lib/service-content';
import { getNetworkNavbarItems } from '@/lib/network-content';

/**
 * Server wrapper untuk Navbar. Item dropdown "Layanan" & "Jaringan" diambil
 * dari CMS (tabel ServiceMenuItem / NetworkMenuItem) sehingga admin bisa
 * mengubahnya tanpa deploy. Semua halaman cukup mengimpor '@/components/Navbar'.
 */
export default async function Navbar() {
  const [layananItems, jaringanItems] = await Promise.all([
    getServiceNavbarItems(),
    getNetworkNavbarItems(),
  ]);

  return <NavbarClient layananItems={layananItems} jaringanItems={jaringanItems} />;
}
