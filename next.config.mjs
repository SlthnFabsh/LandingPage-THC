/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Batas ukuran upload gambar dari CMS (lihat src/lib/upload.ts).
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
};

export default nextConfig;