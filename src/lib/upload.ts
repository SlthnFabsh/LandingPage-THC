import sharp from 'sharp';

export interface UploadResult {
  coverImage: string; // bisa path public atau data URL base64
  error?: string;
}

// Mengolah file gambar yang diupload menjadi WebP.
// Pada Vercel filesystem bersifat stateless, sehingga hasil disimpan sebagai
// data URL base64 agar persisten di database.
export async function processImageUpload(file: File | null): Promise<UploadResult> {
  if (!file) return { coverImage: '' };

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
  if (!allowedTypes.includes(file.type)) {
    return { coverImage: '', error: 'Tipe file tidak didukung. Gunakan JPG/PNG/WebP.' };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  let webpBuffer: Buffer;

  try {
    webpBuffer = await sharp(bytes)
      .rotate()
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
  } catch {
    return { coverImage: '', error: 'Gagal memproses gambar.' };
  }

  return { coverImage: `data:image/webp;base64,${webpBuffer.toString('base64')}` };
}
