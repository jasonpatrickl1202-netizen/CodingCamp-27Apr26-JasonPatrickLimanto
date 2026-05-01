# Requirements Document

## Introduction

Aplikasi Visualisasi Pengeluaran & Anggaran adalah aplikasi web berbasis klien yang memungkinkan pengguna untuk melacak pengeluaran mereka, mengkategorikan transaksi, dan memvisualisasikan pola pengeluaran melalui bagan pai. Aplikasi ini menggunakan localStorage untuk persistensi data tanpa memerlukan backend server.

## Glossary

- **Application**: Aplikasi web Visualisasi Pengeluaran & Anggaran
- **Transaction**: Entitas data yang merepresentasikan satu pengeluaran dengan nama barang, jumlah, dan kategori
- **Transaction_Form**: Formulir input untuk menambahkan transaksi baru
- **Transaction_List**: Komponen UI yang menampilkan daftar semua transaksi
- **Total_Balance_Display**: Komponen UI yang menampilkan total pengeluaran
- **Pie_Chart**: Visualisasi bagan pai yang menampilkan distribusi pengeluaran berdasarkan kategori
- **LocalStorage**: API browser untuk menyimpan data secara persisten di sisi klien
- **Valid_Category**: Salah satu dari tiga kategori default (Makanan, Transportasi, Hiburan) atau kategori khusus yang ditambahkan pengguna
- **Custom_Category**: Kategori yang ditambahkan oleh pengguna untuk mengkategorikan pengeluaran sesuai kebutuhan spesifik
- **Expense_Threshold**: Batas jumlah pengeluaran yang digunakan untuk menyorot transaksi dengan jumlah yang melebihi batas tersebut

## Requirements

### Requirement 1: Input Transaksi

**User Story:** As a pengguna, I want to menambahkan transaksi pengeluaran baru, so that I can melacak pengeluaran saya

#### Acceptance Criteria

1. THE Transaction_Form SHALL display tiga kolom input: Nama Barang (text), Jumlah (number), dan Kategori (dropdown)
2. THE Transaction_Form SHALL provide dropdown kategori dengan tiga pilihan: Makanan, Transportasi, dan Hiburan
3. WHEN pengguna mengisi semua kolom dan mengirimkan formulir, THE Application SHALL create transaksi baru dengan data yang dimasukkan
4. WHEN pengguna mengirimkan formulir, THE Transaction_Form SHALL clear semua kolom input setelah transaksi berhasil ditambahkan
5. THE Transaction_Form SHALL accept jumlah sebagai angka positif dengan dukungan untuk nilai desimal

### Requirement 2: Validasi Formulir

**User Story:** As a pengguna, I want to menerima validasi pada formulir input, so that I can memastikan data yang saya masukkan lengkap dan valid

#### Acceptance Criteria

1. WHEN pengguna mencoba mengirimkan formulir dengan kolom Nama Barang kosong, THE Application SHALL prevent submission dan display pesan error
2. WHEN pengguna mencoba mengirimkan formulir dengan kolom Jumlah kosong, THE Application SHALL prevent submission dan display pesan error
3. WHEN pengguna mencoba mengirimkan formulir dengan kolom Kategori tidak dipilih, THE Application SHALL prevent submission dan display pesan error
4. WHEN pengguna memasukkan jumlah negatif atau nol, THE Application SHALL prevent submission dan display pesan error
5. WHEN semua kolom terisi dengan data valid, THE Application SHALL allow submission

### Requirement 3: Tampilan Daftar Transaksi

**User Story:** As a pengguna, I want to melihat daftar semua transaksi saya, so that I can meninjau pengeluaran yang telah dicatat

#### Acceptance Criteria

1. THE Transaction_List SHALL display semua transaksi dengan informasi: Nama Barang, Jumlah, dan Kategori
2. THE Transaction_List SHALL be scrollable ketika jumlah transaksi melebihi tinggi area tampilan
3. WHEN tidak ada transaksi, THE Transaction_List SHALL display pesan yang menunjukkan daftar kosong
4. WHEN transaksi baru ditambahkan, THE Transaction_List SHALL update secara otomatis untuk menampilkan transaksi tersebut
5. THE Transaction_List SHALL display jumlah dalam format mata uang yang sesuai dengan dua digit desimal

### Requirement 4: Penghapusan Transaksi

**User Story:** As a pengguna, I want to menghapus transaksi dari daftar, so that I can mengoreksi kesalahan atau menghapus entri yang tidak relevan

#### Acceptance Criteria

1. THE Transaction_List SHALL display tombol hapus untuk setiap transaksi
2. WHEN pengguna mengklik tombol hapus pada transaksi, THE Application SHALL remove transaksi tersebut dari daftar
3. WHEN transaksi dihapus, THE Total_Balance_Display SHALL update secara otomatis
4. WHEN transaksi dihapus, THE Pie_Chart SHALL update secara otomatis
5. WHEN transaksi dihapus, THE Application SHALL persist perubahan ke LocalStorage

### Requirement 5: Tampilan Saldo Total

**User Story:** As a pengguna, I want to melihat total pengeluaran saya, so that I can memahami berapa banyak yang telah saya keluarkan

#### Acceptance Criteria

1. THE Total_Balance_Display SHALL be positioned di bagian atas halaman
2. THE Total_Balance_Display SHALL calculate dan display jumlah total dari semua transaksi
3. WHEN transaksi baru ditambahkan, THE Total_Balance_Display SHALL update secara otomatis
4. WHEN transaksi dihapus, THE Total_Balance_Display SHALL update secara otomatis
5. THE Total_Balance_Display SHALL display jumlah dalam format mata uang dengan dua digit desimal

### Requirement 6: Visualisasi Bagan Pai

**User Story:** As a pengguna, I want to melihat visualisasi pengeluaran berdasarkan kategori, so that I can memahami distribusi pengeluaran saya

#### Acceptance Criteria

1. THE Pie_Chart SHALL use Chart.js library untuk rendering
2. THE Pie_Chart SHALL display distribusi pengeluaran berdasarkan tiga kategori: Makanan, Transportasi, dan Hiburan
3. WHEN transaksi baru ditambahkan, THE Pie_Chart SHALL update secara otomatis
4. WHEN transaksi dihapus, THE Pie_Chart SHALL update secara otomatis
5. THE Pie_Chart SHALL display persentase untuk setiap kategori
6. WHEN tidak ada transaksi, THE Pie_Chart SHALL display pesan atau bagan kosong yang sesuai
7. THE Pie_Chart SHALL use warna yang berbeda untuk setiap kategori

### Requirement 7: Persistensi Data

**User Story:** As a pengguna, I want to data transaksi saya disimpan secara otomatis, so that I can mengakses data saya setelah menutup dan membuka kembali aplikasi

#### Acceptance Criteria

1. WHEN transaksi baru ditambahkan, THE Application SHALL save data ke LocalStorage
2. WHEN transaksi dihapus, THE Application SHALL update data di LocalStorage
3. WHEN aplikasi dimuat, THE Application SHALL load semua transaksi dari LocalStorage
4. WHEN aplikasi dimuat dengan data tersimpan, THE Application SHALL restore dan display semua transaksi, total saldo, dan bagan pai
5. THE Application SHALL serialize transaksi ke format JSON sebelum menyimpan ke LocalStorage

### Requirement 8: Struktur File dan Teknologi

**User Story:** As a developer, I want to menggunakan struktur file yang terorganisir, so that I can memelihara kode dengan mudah

#### Acceptance Criteria

1. THE Application SHALL consist of satu file HTML bernama index.html di root directory
2. THE Application SHALL consist of satu file CSS di dalam folder css/
3. THE Application SHALL consist of satu file JavaScript di dalam folder js/
4. THE Application SHALL use JavaScript murni tanpa framework seperti React atau Vue
5. THE Application SHALL be compatible dengan browser modern (Chrome, Firefox, Safari, Edge versi terbaru)
6. THE Application SHALL load Chart.js library dari CDN

### Requirement 9: Pengurutan Transaksi (Opsional)

**User Story:** As a pengguna, I want to mengurutkan transaksi berdasarkan kriteria tertentu, so that I can menemukan informasi dengan lebih mudah

#### Acceptance Criteria

1. WHERE fitur pengurutan diimplementasikan, THE Application SHALL provide opsi untuk mengurutkan berdasarkan jumlah
2. WHERE fitur pengurutan diimplementasikan, THE Application SHALL provide opsi untuk mengurutkan berdasarkan kategori
3. WHERE fitur pengurutan diimplementasikan, WHEN pengguna memilih opsi pengurutan, THE Transaction_List SHALL reorder transaksi sesuai kriteria yang dipilih
4. WHERE fitur pengurutan diimplementasikan, THE Application SHALL maintain urutan yang dipilih hingga pengguna mengubahnya

### Requirement 10: Tampilan Ringkasan Bulanan (Opsional)

**User Story:** As a pengguna, I want to melihat ringkasan pengeluaran bulanan, so that I can melacak tren pengeluaran dari waktu ke waktu

#### Acceptance Criteria

1. WHERE fitur ringkasan bulanan diimplementasikan, THE Application SHALL track tanggal untuk setiap transaksi
2. WHERE fitur ringkasan bulanan diimplementasikan, THE Application SHALL calculate total pengeluaran per bulan
3. WHERE fitur ringkasan bulanan diimplementasikan, THE Application SHALL display ringkasan yang menunjukkan total pengeluaran untuk setiap bulan
4. WHERE fitur ringkasan bulanan diimplementasikan, THE Application SHALL allow pengguna untuk melihat transaksi dari bulan tertentu

### Requirement 11: Mode Gelap/Terang (Opsional)

**User Story:** As a pengguna, I want to beralih antara mode gelap dan terang, so that I can menggunakan aplikasi dengan nyaman di berbagai kondisi pencahayaan

#### Acceptance Criteria

1. WHERE fitur mode tema diimplementasikan, THE Application SHALL provide tombol toggle untuk beralih antara mode gelap dan terang
2. WHERE fitur mode tema diimplementasikan, WHEN pengguna mengklik tombol toggle, THE Application SHALL switch tema secara langsung
3. WHERE fitur mode tema diimplementasikan, THE Application SHALL persist preferensi tema pengguna di LocalStorage
4. WHERE fitur mode tema diimplementasikan, WHEN aplikasi dimuat, THE Application SHALL apply tema yang tersimpan
5. WHERE fitur mode tema diimplementasikan, THE Application SHALL update warna untuk semua komponen UI termasuk formulir, daftar, dan bagan

### Requirement 12: Kategori Khusus

**User Story:** As a pengguna, I want to menambahkan kategori khusus saya sendiri, so that I can mengkategorikan pengeluaran sesuai kebutuhan spesifik saya

#### Acceptance Criteria

1. THE Application SHALL provide antarmuka untuk menambahkan kategori baru
2. WHEN pengguna menambahkan kategori baru, THE Application SHALL validate bahwa nama kategori tidak kosong
3. WHEN pengguna menambahkan kategori baru, THE Application SHALL validate bahwa nama kategori belum ada dalam daftar kategori
4. WHEN kategori baru ditambahkan, THE Application SHALL update dropdown kategori di Transaction_Form untuk menyertakan kategori baru
5. WHEN kategori baru ditambahkan, THE Application SHALL persist daftar kategori ke LocalStorage
6. WHEN aplikasi dimuat, THE Application SHALL load kategori khusus dari LocalStorage
7. THE Application SHALL allow pengguna untuk menghapus kategori khusus yang tidak digunakan
8. WHEN kategori khusus dihapus, IF ada transaksi yang menggunakan kategori tersebut, THEN THE Application SHALL prevent penghapusan dan display pesan error
9. THE Pie_Chart SHALL display semua kategori termasuk kategori khusus dengan warna yang berbeda

### Requirement 13: Sorot Pengeluaran di Atas Batas

**User Story:** As a pengguna, I want to melihat pengeluaran yang melebihi batas tertentu dengan sorotan visual, so that I can mengidentifikasi pengeluaran besar dengan cepat

#### Acceptance Criteria

1. THE Application SHALL provide input field untuk mengatur batas pengeluaran (threshold)
2. WHEN pengguna mengatur batas pengeluaran, THE Application SHALL persist nilai batas ke LocalStorage
3. WHEN aplikasi dimuat, THE Application SHALL load nilai batas dari LocalStorage
4. WHEN transaksi memiliki jumlah yang melebihi batas yang ditentukan, THE Transaction_List SHALL display transaksi tersebut dengan visual highlighting yang berbeda
5. THE Application SHALL use warna atau styling yang kontras untuk membedakan transaksi yang melebihi batas
6. WHEN batas pengeluaran diubah, THE Transaction_List SHALL update highlighting secara otomatis
7. WHERE batas pengeluaran tidak diatur, THE Application SHALL not apply highlighting ke transaksi apapun
