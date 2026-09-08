# CMS THC - Panduan Setup Database & Deployment

## Ikhtisar

CMS ini menggunakan:
- **Next.js 15** (App Router + Server Actions)
- **Prisma 7** (ORM untuk MySQL)
- **MySQL cloud** (PlanetScale / Aiven / Railway / Supabase)
- **Vercel** (deployment)

---

## Langkah 1: Siapkan Database MySQL Cloud

### Opsi A: PlanetScale (Recommended)
1. Buat akun gratis di [planetscale.com](https://planetscale.com)
2. Buat database baru, pilih region terdekat (Singapore `ap-southeast-1`)
3. Salin **connection string** dari dashboard:
   ```
   mysql://username:password@aws.connect.psdb.cloud/dbname?sslaccept=strict   
   ```

### Opsi B: Aiven
1. Buat akun gratis di [aiven.io](https://aiven.io)
2. Buat service MySQL (plan "Hobby" gratis)
3. Salin connection string

### Opsi C: Railway
1. Buat akun di [railway.app](https://railway.app)
2. Deploy MySQL service
3. Salin connection string

---

## Langkah 2: Konfigurasi Environment Variables

### Di Lokal (`.env` di root project):
```env
# Database MySQL (ganti dengan connection string dari langkah 1)
DATABASE_URL="mysql://username:password@host:3306/dbname?sslaccept=strict"

# Session secret (generate random string 64 karakter)
SESSION_SECRET="your-super-secret-random-string-64-chars-minimum"

# Encryption key untuk 2FA TOTP secret (exactly 32 characters)
ENCRYPTION_KEY="your-32-char-encryption-key!!"
```

**Cara generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Cara generate ENCRYPTION_KEY (tepat 32 karakter):**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Di Vercel Dashboard:
1. Buka project di Vercel → Settings → Environment Variables
2. Tambahkan variabel yang sama: `DATABASE_URL`, `SESSION_SECRET`, `ENCRYPTION_KEY`
3. Pilih environment: Production, Preview, Development

---

## Langkah 3: Jalankan Migrasi Database

```bash
# Push schema ke database (tanpa migrasi file, langsung sync)
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

**Jika ada error:** Pastikan `DATABASE_URL` benar dan database bisa diakses.

---

## Langkah 4: Seed Data Awal (Admin + Berita)

```bash
# Jalankan seed script (dengan adapter MySQL yang valid)
npx tsx prisma/seed.ts
```

**Akun admin default:**
- Email: `admin@transhybrid.co.id`
- Password: `Admin123!`
- **⚠️ GANTI PASSWORD SEGERA setelah login pertama!**

---

## Langkah 5: Jalankan Development Server

```bash
npm run dev
```

Buka:
- Website: `http://localhost:3000`
- CMS Login: `http://localhost:3000/cms/login`

---

## Langkah 6: Deploy ke Vercel

```bash
# Commit & push ke GitHub
git add .
git commit -m "feat: CMS + auth + 2FA + audit trail"
git push
```

Vercel akan otomatis:
1. Build project
2. Jalankan `prisma generate` (otomatis via `postinstall` script)

**Catatan:** Migrasi `prisma db push` harus dijalankan manual atau via Vercel Build Command:
1. Vercel Dashboard → Settings → Build & Development Settings
2. Build Command: `npx prisma db push && npx prisma generate && npx next build`

---

## Langkah 7: Setup 2FA (Setelah Login Pertama)

1. Login ke CMS (`/cms/login`)
2. Klik **"Aktifkan 2FA Sekarang"** di dashboard
3. Scan QR code dengan Google Authenticator
4. Masukkan kode 6 digit
5. 2FA aktif untuk akun ini

---

## Fitur CMS

| Fitur | Keterangan |
|-------|-----------|
| Login | Email + Password (Argon2id) |
| 2FA | Google Authenticator (TOTP) |
| Password Policy | 8+ karakter, huruf besar/kecil, angka, simbol, expire 90 hari |
| Audit Trail | Catatan semua aktivitas login, CRUD, password change |
| CRUD Berita | Tambah, edit, hapus berita (bilingual ID/EN) |
| Upload Gambar | Auto-kompres ke WebP, simpan sebagai base64 di DB |

---

## Struktur CMS

```
/cms/login          → Login
/cms/login/verify   → Verifikasi 2FA
/cms                → Dashboard
/cms/news           → Daftar berita
/cms/news/new       → Tambah berita
/cms/news/[id]/edit → Edit berita
/cms/password       → Ganti kata sandi
/cms/2fa/setup      → Aktifkan/nonaktifkan 2FA
/cms/audit          → Audit trail
```

---

## Troubleshooting

### Build gagal di Vercel?
- Pastikan `DATABASE_URL` tersedia di Vercel env
- Pastikan MySQL cloud bisa diakses dari internet (bukan localhost)

### Login gagal?
- Cek apakah admin sudah di-seed
- Cek `DATABASE_URL` di `.env`

### 2FA tidak bisa scan?
- Pastikan `ENCRYPTION_KEY` diisi (tepat 32 karakter)
- Generate baru: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`

### Gambar berita tidak muncul?
- CMS upload gambar sebagai WebP base64 di database
- Jika gambar terlalu besar, proses upload mungkin timeout
