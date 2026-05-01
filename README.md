# Visualisasi Pengeluaran & Anggaran

Aplikasi web untuk melacak dan memvisualisasikan pengeluaran harian dengan kategori dan grafik interaktif.

## 🚀 Fitur Utama

### Fitur Inti (MVP)
- ✅ **Formulir Input Transaksi** - Tambah transaksi dengan nama barang, jumlah, dan kategori
- ✅ **Validasi Formulir** - Validasi lengkap untuk semua input
- ✅ **Daftar Transaksi** - Tampilan scrollable dengan kemampuan hapus
- ✅ **Total Saldo** - Perhitungan otomatis total pengeluaran
- ✅ **Grafik Pai** - Visualisasi distribusi pengeluaran per kategori menggunakan Chart.js
- ✅ **Persistensi Data** - Penyimpanan otomatis ke localStorage

### Fitur Lanjutan
- ✅ **Kategori Khusus** - Tambah kategori pengeluaran sendiri dengan color picker
- ✅ **Sorot Pengeluaran** - Atur batas dan sorot transaksi yang melebihi batas
- 🔄 **Pengurutan Transaksi** - (Opsional) Urutkan berdasarkan jumlah atau kategori
- 🔄 **Ringkasan Bulanan** - (Opsional) Lihat tren pengeluaran per bulan
- 🔄 **Mode Gelap/Terang** - (Opsional) Toggle tema aplikasi

## 📋 Persyaratan

- Browser modern (Chrome, Firefox, Safari, Edge versi terbaru)
- JavaScript diaktifkan
- localStorage tersedia

## 🛠️ Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan responsive design
- **Vanilla JavaScript (ES6+)** - Logika aplikasi tanpa framework
- **Chart.js v4.4.0** - Visualisasi grafik pai
- **localStorage API** - Persistensi data

## 📁 Struktur Proyek

```
expense-budget-visualizer/
├── index.html          # File HTML utama
├── css/
│   └── style.css      # Styling aplikasi
├── js/
│   └── app.js         # Logika aplikasi
└── README.md          # Dokumentasi
```

## 🎯 Cara Menggunakan

### 1. Menjalankan Aplikasi

Buka file `index.html` di browser Anda. Tidak perlu server - aplikasi berjalan sepenuhnya di browser.

### 2. Menambah Transaksi

1. Isi formulir dengan:
   - **Nama Barang**: Nama item yang dibeli
   - **Jumlah**: Harga dalam Rupiah (contoh: 25000)
   - **Kategori**: Pilih dari dropdown (Makanan, Transportasi, Hiburan, atau kategori khusus)
2. Klik tombol **"Tambah Transaksi"**
3. Transaksi akan muncul di daftar dan grafik akan diperbarui otomatis

### 3. Menghapus Transaksi

Klik tombol **"Hapus"** pada transaksi yang ingin dihapus. Total saldo dan grafik akan diperbarui otomatis.

### 4. Menambah Kategori Khusus

1. Di bagian **"Kategori Khusus"**:
   - Masukkan nama kategori baru
   - Pilih warna untuk kategori (klik color picker)
2. Klik **"Tambah Kategori"**
3. Kategori baru akan muncul di dropdown dan dapat digunakan untuk transaksi

**Catatan**: Kategori yang sudah digunakan tidak dapat dihapus.

### 5. Mengatur Batas Pengeluaran

1. Di bagian **"Batas Pengeluaran"**:
   - Masukkan jumlah batas (contoh: 100000)
2. Klik **"Atur Batas"**
3. Transaksi yang melebihi batas akan ditandai dengan warna merah

Untuk menghapus batas, klik **"Hapus Batas"**.

## 💾 Penyimpanan Data

Semua data disimpan secara otomatis di localStorage browser Anda:
- **Transaksi** - Semua transaksi yang ditambahkan
- **Kategori Khusus** - Kategori yang Anda buat
- **Batas Pengeluaran** - Nilai threshold yang diatur

Data akan tetap ada meskipun browser ditutup dan dibuka kembali.

## 🎨 Fitur UI

### Responsive Design
Aplikasi otomatis menyesuaikan tampilan untuk:
- Desktop (layout 2 kolom)
- Tablet (layout 1 kolom)
- Mobile (layout vertikal)

### Visual Highlighting
- Transaksi di atas batas: **Background merah muda** dengan **border merah**
- Kategori: **Badge berwarna** sesuai kategori
- Hover effects: **Animasi smooth** pada semua elemen interaktif

### Grafik Interaktif
- **Pie chart** dengan persentase per kategori
- **Tooltip** menampilkan jumlah dan persentase saat hover
- **Warna konsisten** untuk setiap kategori
- **Update otomatis** saat data berubah

## 🔧 Validasi

Aplikasi memvalidasi semua input:
- ✅ Nama barang tidak boleh kosong
- ✅ Jumlah harus angka positif (> 0)
- ✅ Kategori harus dipilih
- ✅ Nama kategori khusus harus unik
- ✅ Batas pengeluaran harus angka positif

Pesan error akan ditampilkan jika validasi gagal.

## 🐛 Error Handling

Aplikasi menangani berbagai error:
- **localStorage penuh**: Pesan untuk hapus transaksi lama
- **localStorage tidak tersedia**: Peringatan data tidak persisten
- **Chart.js gagal load**: Fallback ke tampilan teks
- **Data corrupt**: Reset otomatis dengan notifikasi

## 📊 Format Data

### Transaction
```javascript
{
  id: "1704067200000abc123",
  name: "Nasi Goreng",
  amount: 25000,
  category: "Makanan",
  timestamp: 1704067200000
}
```

### Custom Category
```javascript
{
  name: "Kesehatan",
  color: "#4CAF50",
  createdAt: 1704067200000
}
```

### Threshold
```javascript
{
  value: 100000
}
```

## 🌐 Kompatibilitas Browser

| Browser | Versi Minimum |
|---------|---------------|
| Chrome  | 90+           |
| Firefox | 88+           |
| Safari  | 14+           |
| Edge    | 90+           |

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan dapat digunakan secara bebas.

## 🤝 Kontribusi

Untuk menambahkan fitur atau memperbaiki bug:
1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📞 Dukungan

Jika menemukan masalah atau memiliki pertanyaan, silakan buat issue di repository.

---

**Dibuat dengan ❤️ menggunakan Vanilla JavaScript**
