# Ruang Warga — RT 07 / RW 09

Demo interaktif berdasarkan PRD Aplikasi RT07 RW09 Prima Harapan Regency versi 1.0, 27 Oktober 2026.

## Status

**Demo untuk evaluasi, belum untuk operasional atau data pribadi asli.** Tidak terhubung ke Supabase, Vercel, rekening pembayaran, atau layanan instansi. Pemilih peran bukan autentikasi. Data dan gambar contoh tersimpan di localStorage browser pengguna; tidak tersinkron antar perangkat. Semua tanggal contoh mengacu pada 27 Oktober 2026. Tombol reset mengembalikan seluruh data awal.

## Menjalankan

Gunakan Node.js 22.12+ atau versi LTS yang kompatibel dengan Vite 8.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

Build menghasilkan `dist/`. Situs ini dapat dihosting sebagai situs statis. Tidak dibutuhkan environment variable atau service key untuk demo. Source tidak memuat kredensial.

## Fitur yang bisa dicoba

- Beranda warga dan dashboard pengurus, navigasi responsif, pilihan lima peran demo.
- Tagihan per rumah, filter, unggah gambar contoh, status menunggu verifikasi.
- Bendahara menerima/menolak pembayaran; penerimaan kas hanya dibuat sekali saat verifikasi diterima.
- Pembuatan tagihan bulanan untuk rumah dihuni, dengan pencegahan duplikasi rumah/periode.
- Kas per periode, saldo awal dan akhir, grafik, transaksi manual, ekspor CSV.
- Pengumuman, prioritas, arsip, tanggal publikasi simulasi; agenda dan unduhan kalender ICS.
- Laporan lingkungan, foto contoh, nomor tiket, catatan dan riwayat status.
- Permohonan surat, pemeriksaan sekretaris, persetujuan ketua, penyelesaian dan nomor contoh, PDF bertanda DRAF DEMO.
- Pengelolaan rumah oleh sekretaris, kontak sendiri, notifikasi lokal, jejak aktivitas demo.
- Pemrosesan gambar browser: batas 5 MB, decode gambar, maksimum sisi 1600 px, encode JPEG tanpa metadata sumber, watermark.
- Manifest PWA dan service worker minimal. Hanya ikon dan manifest dicache; aplikasi tidak mengklaim mendukung seluruh fungsi offline. Dokumen tidak dimasukkan ke cache service worker.

## Skenario mencoba

1. Sebagai Warga, buka Iuran Saya dan kirim gambar fiktif untuk tagihan Oktober A-07.
2. Ganti peran ke Bendahara, buka Iuran & Verifikasi, terima pembayaran dengan catatan.
3. Buka Keuangan RT: saldo naik Rp150.000, tagihan menjadi Lunas. Tagihan yang sama tidak bisa diverifikasi lagi.
4. Sebagai Warga, buat laporan; sebagai Sekretaris, buka laporan lalu tindak lanjuti sampai selesai. Kembali ke Warga untuk melihat riwayat.
5. Ajukan surat sebagai Warga. Sebagai Sekretaris: Diajukan → Dalam pemeriksaan → Menunggu persetujuan. Sebagai Ketua RT: Disetujui. Sebagai Sekretaris: Selesai. Unduh draf PDF sebagai pemohon.
6. Buat tagihan November sebagai Bendahara dua kali; percobaan kedua tidak menambah tagihan duplikat.

## Batasan terhadap PRD / pekerjaan produksi berikutnya

| Area | Demo ini | Perlu sebelum peluncuran |
|---|---|---|
| FR-01 Akun | Identitas dan peran contoh | Supabase Auth, persetujuan akun, pemulihan password, MFA, timeout sesi |
| FR-02 Rumah | Tambah/ubah rumah lokal | Relasi akun-rumah, mutasi, pencabutan akses, pagination backend |
| FR-03 Iuran | Alur simulasi dan guard duplikasi lokal | Transaksi database atomik, constraint unik, bukti privat, rekonsiliasi dan koreksi beraudit |
| FR-04 Kas | Perhitungan dan CSV | Database, pembatalan/koreksi transaksi, lampiran tersamar, rekonsiliasi |
| FR-05 Informasi | Pengumuman/agenda lokal | Publikasi berbasis waktu server dan lampiran privat |
| FR-06 Laporan | Tiket, foto, status lokal | Otorisasi backend, penugasan, bukti penyelesaian |
| FR-07 Surat | Alur, nomor dan PDF contoh | Validasi katalog kelurahan, format resmi, sequence atomik, revisi lampiran |
| FR-08 Arsip | Surat selesai di daftar dan PDF | Arsip surat masuk/keluar lengkap, pencarian server, storage privat, retensi |
| FR-09 Keamanan | Label demo dan minimisasi data | RLS/backend checks, validasi file tepercaya di server, storage privat, audit permanen, retensi |
| FR-10 Dashboard | Ringkasan data contoh | Agregasi sesuai otorisasi backend |

NIK, KK, identitas anak, serta PDF identitas tidak dikumpulkan. Gambar demo disimpan lokal untuk memudahkan pengujian; pendekatan ini **tidak boleh** diteruskan untuk dokumen pribadi produksi. Masking di UI dan menu peran demo tidak memberikan keamanan. Akun administrator teknis pada demo tidak dimaksudkan memperoleh akses dokumen sensitif.

Pengurus perlu menetapkan tarif, rekening/QRIS resmi, jumlah rumah, format penomoran surat, katalog layanan yang sah, kebijakan privasi dan retensi, kepemilikan infrastruktur, backup/pemulihan, serta menyetujui UAT. Tidak ada klaim bahwa MVP telah memenuhi Definition of Done produksi.

## Arsitektur demo

React + Vite; CSS responsif; lucide-react; jsPDF dimuat hanya saat mengunduh. `src/domain.js` berisi logika transaksi, tagihan, CSV, dan data contoh. `src/main.jsx` berisi antarmuka dan penyimpanan lokal. `tests/domain.test.js` memeriksa invariant keuangan dan pencegahan duplikasi. Data versi 1 berada pada key `rt07-demo-v1`.

Untuk produksi, pertahankan antarmuka dan ganti lapisan penyimpanan dengan Supabase (Auth, PostgreSQL + RLS, Storage privat, Edge Functions). Vercel dapat digunakan sesuai PRD; demo saat ini diterbitkan secara privat melalui Sites. Migrasi backend belum diterapkan atau diuji karena proyek Supabase RT belum tersedia.
