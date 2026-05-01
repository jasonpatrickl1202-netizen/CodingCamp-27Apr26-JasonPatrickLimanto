# Implementation Plan: Expense Budget Visualizer

## Overview

Implementasi aplikasi Visualisasi Pengeluaran & Anggaran menggunakan vanilla JavaScript, HTML5, dan CSS3 dengan arsitektur berbasis komponen. Aplikasi ini akan dibangun secara incremental, dimulai dari struktur dasar, kemudian menambahkan logika bisnis, UI rendering, persistensi data, visualisasi chart, dan fitur lanjutan (kategori khusus dan highlighting pengeluaran). Setiap langkah akan divalidasi dengan tests untuk memastikan correctness properties terpenuhi.

## Tasks

- [ ] 1. Setup struktur proyek dan file dasar
  - Buat file `index.html` di root directory dengan struktur HTML5 dasar
  - Buat folder `css/` dan file `css/style.css` untuk styling
  - Buat folder `js/` dan file `js/app.js` untuk logika aplikasi
  - Tambahkan link Chart.js CDN di HTML
  - Tambahkan struktur HTML untuk form input, daftar transaksi, total balance, dan canvas untuk chart
  - _Requirements: 8.1, 8.2, 8.3, 8.6_

- [ ] 2. Implementasi data models dan validation logic
  - [ ] 2.1 Buat Transaction model dan constants
    - Definisikan struktur Transaction object dengan properties: id, name, amount, category, timestamp
    - Definisikan CATEGORIES constant dengan tiga kategori: Makanan, Transportasi, Hiburan
    - Implementasikan fungsi untuk generate unique ID (timestamp-based atau UUID)
    - _Requirements: 1.2, 1.3, 1.5_

  - [ ]* 2.2 Write property test for Transaction creation
    - **Property 1: Transaction Creation Preserves Data**
    - **Validates: Requirements 1.3, 1.5**

  - [ ] 2.3 Implementasi FormValidator class
    - Buat class FormValidator dengan methods: validateName, validateAmount, validateCategory, validateForm
    - Implementasi validasi untuk nama (non-empty, trimmed)
    - Implementasi validasi untuk amount (positive number, > 0)
    - Implementasi validasi untuk category (salah satu dari CATEGORIES)
    - Return ValidationResult object dengan isValid dan errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 2.4 Write property tests for validation logic
    - **Property 3: Validation Rejects Invalid Inputs**
    - **Validates: Requirements 2.1, 2.4**
    - **Property 4: Validation Accepts Valid Inputs**
    - **Validates: Requirements 2.5**

- [ ] 3. Implementasi StorageManager untuk persistensi data
  - [ ] 3.1 Buat StorageManager class
    - Implementasi constructor dengan storageKey parameter
    - Implementasi method save(transactions) untuk menyimpan ke localStorage
    - Implementasi method load() untuk membaca dari localStorage
    - Implementasi method clear() untuk menghapus data
    - Implementasi error handling untuk QuotaExceededError dan localStorage unavailable
    - Implementasi serialization/deserialization dengan JSON
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

  - [ ]* 3.2 Write property tests for storage operations
    - **Property 9: localStorage Persistence**
    - **Validates: Requirements 7.1, 7.2, 4.5**
    - **Property 10: localStorage Loading Restores State**
    - **Validates: Requirements 7.3**
    - **Property 11: JSON Serialization Round-Trip**
    - **Validates: Requirements 7.5**

  - [ ]* 3.3 Write unit tests for storage error handling
    - Test QuotaExceededError scenario
    - Test localStorage unavailable scenario
    - Test corrupted JSON data scenario
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implementasi TransactionManager untuk business logic
  - [ ] 5.1 Buat TransactionManager class
    - Implementasi constructor yang menerima storageManager, uiManager, chartManager
    - Implementasi in-memory array untuk menyimpan transactions
    - Implementasi method addTransaction(name, amount, category) yang validate input, create transaction, save, dan notify observers
    - Implementasi method deleteTransaction(id) yang remove transaction, save, dan notify observers
    - Implementasi method getTransactions() untuk return semua transactions
    - Implementasi method getTotalBalance() untuk calculate sum of amounts
    - Implementasi method getCategoryTotals() untuk calculate totals per category
    - Implementasi method loadTransactions() untuk load dari storage saat initialization
    - Implementasi method notifyObservers() untuk trigger UI dan Chart updates
    - _Requirements: 1.3, 4.2, 5.2, 6.2_

  - [ ]* 5.2 Write property tests for TransactionManager
    - **Property 7: Total Balance Calculation Correctness**
    - **Validates: Requirements 5.2, 5.3, 5.4, 4.3**
    - **Property 8: Transaction Deletion Removes From List**
    - **Validates: Requirements 4.2**

  - [ ]* 5.3 Write unit tests for TransactionManager
    - Test addTransaction dengan valid data
    - Test addTransaction dengan invalid data (should reject)
    - Test deleteTransaction dengan valid ID
    - Test deleteTransaction dengan invalid ID
    - Test getCategoryTotals calculation
    - _Requirements: 1.3, 4.2, 5.2_

- [ ] 6. Implementasi UIManager untuk rendering dan DOM manipulation
  - [ ] 6.1 Buat UIManager class
    - Implementasi constructor yang menerima transactionManager
    - Implementasi method renderTransactionList(transactions) untuk render daftar transaksi dengan nama, amount (formatted), category, dan delete button
    - Implementasi method renderTotalBalance(total) untuk display total dengan currency formatting
    - Implementasi method renderEmptyState() untuk display pesan ketika tidak ada transaksi
    - Implementasi method clearForm() untuk reset semua input fields
    - Implementasi method showValidationError(field, message) untuk display error messages
    - Implementasi method clearValidationErrors() untuk remove error messages
    - Implementasi method bindAddTransaction(handler) untuk bind form submit event
    - Implementasi method bindDeleteTransaction(handler) untuk bind delete button clicks
    - Implementasi currency formatting helper (2 decimal places)
    - _Requirements: 1.4, 3.1, 3.3, 3.4, 3.5, 4.1, 5.1, 5.5, 2.1_

  - [ ]* 6.2 Write property tests for UI rendering
    - **Property 2: Form Clearing After Submission**
    - **Validates: Requirements 1.4**
    - **Property 5: Transaction List Displays Complete Data**
    - **Validates: Requirements 3.1, 3.4, 4.1**
    - **Property 6: Currency Formatting Consistency**
    - **Validates: Requirements 3.5, 5.5**

  - [ ]* 6.3 Write unit tests for UI structure
    - Test form structure memiliki input fields yang benar (name, amount, category)
    - Test empty state message display
    - Test currency formatting dengan berbagai nilai
    - Test validation error display
    - _Requirements: 1.1, 1.2, 3.3, 3.5_

- [ ] 7. Implementasi ChartManager untuk visualisasi Chart.js
  - [ ] 7.1 Buat ChartManager class
    - Implementasi constructor yang menerima canvasElement dan transactionManager
    - Implementasi method initializeChart() untuk create Chart.js pie chart instance
    - Implementasi method updateChart(categoryTotals) untuk update chart data
    - Implementasi method destroyChart() untuk cleanup chart instance
    - Implementasi method preparePieChartData(categoryTotals) untuk format data untuk Chart.js
    - Implementasi method getCategoryColors() untuk assign consistent colors ke categories
    - Implementasi empty state handling (no data scenario)
    - Implementasi error handling untuk Chart.js not loaded
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 7.2 Write unit tests for ChartManager
    - Test preparePieChartData dengan berbagai category totals
    - Test getCategoryColors returns consistent colors
    - Test empty state handling
    - Test Chart.js not loaded error handling
    - _Requirements: 6.1, 6.2, 6.6, 6.7_

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implementasi AppController untuk koordinasi komponen
  - [ ] 9.1 Buat AppController class
    - Implementasi constructor untuk initialize semua managers (StorageManager, UIManager, ChartManager, TransactionManager)
    - Implementasi method initialize() untuk setup aplikasi: load transactions, render initial UI, bind events
    - Implementasi method handleAddTransaction(event) untuk handle form submission
    - Implementasi method handleDeleteTransaction(id) untuk handle delete button clicks
    - Wire semua komponen bersama-sama dengan proper dependency injection
    - _Requirements: 1.3, 4.2, 7.4_

  - [ ]* 9.2 Write integration tests untuk AppController
    - Test complete flow: add transaction → display → persist
    - Test complete flow: delete transaction → update UI → persist
    - Test initialization flow: load from storage → render UI and chart
    - _Requirements: 1.3, 3.4, 4.2, 4.3, 4.4, 4.5, 7.4_

- [ ] 10. Implementasi styling dan responsive layout
  - [ ] 10.1 Buat CSS styling di style.css
    - Implementasi layout untuk form, transaction list, total balance, dan chart
    - Implementasi responsive design untuk berbagai ukuran layar
    - Implementasi styling untuk form inputs dan buttons
    - Implementasi styling untuk transaction list items dengan delete buttons
    - Implementasi styling untuk validation error messages (red text/border)
    - Implementasi styling untuk empty state messages
    - Implementasi scrollable transaction list
    - Implementasi positioning untuk total balance di bagian atas
    - _Requirements: 3.2, 5.1, 2.1_

  - [ ]* 10.2 Write unit tests untuk CSS structure
    - Test form layout structure
    - Test transaction list scrollable behavior
    - Test error styling classes
    - _Requirements: 3.2, 5.1_

- [ ] 11. Integration dan wiring final
  - [ ] 11.1 Wire semua komponen di index.html
    - Pastikan semua script tags loaded dengan urutan yang benar
    - Pastikan Chart.js CDN loaded sebelum app.js
    - Pastikan DOM elements memiliki IDs yang sesuai dengan JavaScript selectors
    - Initialize AppController saat DOMContentLoaded event
    - _Requirements: 8.4, 8.5, 8.6_

  - [ ] 11.2 Implementasi error handling dan edge cases
    - Implementasi localStorage availability check
    - Implementasi Chart.js availability check
    - Implementasi fallback untuk chart rendering failure
    - Implementasi user-friendly error messages dalam Bahasa Indonesia
    - _Requirements: 8.5_

  - [ ]* 11.3 Write end-to-end integration tests
    - Test complete user flow: open app → add transactions → view chart → delete transactions → reload page
    - Test localStorage persistence across page reloads
    - Test chart updates when transactions change
    - Test error scenarios: storage full, Chart.js not loaded
    - _Requirements: 7.3, 7.4, 6.3, 6.4_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Implementasi CategoryManager untuk kategori khusus
  - [ ] 13.1 Buat CategoryManager class
    - Implementasi constructor yang menerima storageManager
    - Implementasi method addCustomCategory(name, color) untuk menambahkan kategori baru
    - Implementasi method deleteCustomCategory(name) untuk menghapus kategori khusus
    - Implementasi method getAllCategories() untuk return semua kategori (default + custom)
    - Implementasi method getCustomCategories() untuk return hanya kategori khusus
    - Implementasi method getCategoryColor(name) untuk return warna kategori
    - Implementasi method isCategoryInUse(name) untuk check apakah kategori digunakan transaksi
    - Implementasi method validateCategoryName(name) untuk validasi nama kategori (non-empty, unique)
    - Implementasi method loadCustomCategories() untuk load dari storage
    - Implementasi color generator untuk assign warna unik ke kategori baru
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8_

  - [ ]* 13.2 Write property tests for CategoryManager
    - **Property 12: Custom Category Uniqueness**
    - **Validates: Requirements 12.3**
    - **Property 13: Custom Category Persistence**
    - **Validates: Requirements 12.5, 12.6**
    - **Property 14: Category Deletion Protection**
    - **Validates: Requirements 12.8**

  - [ ]* 13.3 Write unit tests for CategoryManager
    - Test addCustomCategory dengan nama valid
    - Test addCustomCategory dengan nama duplikat (should reject)
    - Test deleteCustomCategory dengan kategori yang tidak digunakan
    - Test deleteCustomCategory dengan kategori yang digunakan (should reject)
    - Test getAllCategories returns default + custom categories
    - Test color assignment untuk kategori baru
    - _Requirements: 12.2, 12.3, 12.7, 12.8_

- [ ] 14. Implementasi ThresholdManager untuk highlighting pengeluaran
  - [ ] 14.1 Buat ThresholdManager class
    - Implementasi constructor yang menerima storageManager
    - Implementasi method setThreshold(value) untuk set batas pengeluaran
    - Implementasi method getThreshold() untuk return nilai batas
    - Implementasi method clearThreshold() untuk hapus batas
    - Implementasi method isAboveThreshold(amount) untuk check apakah amount melebihi batas
    - Implementasi method loadThreshold() untuk load dari storage
    - Implementasi validasi threshold adalah positive number atau null
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.6, 13.7_

  - [ ]* 14.2 Write property tests for ThresholdManager
    - **Property 15: Threshold Highlighting Consistency**
    - **Validates: Requirements 13.4, 13.5**
    - **Property 16: Threshold Persistence**
    - **Validates: Requirements 13.2, 13.3**

  - [ ]* 14.3 Write unit tests for ThresholdManager
    - Test setThreshold dengan nilai valid
    - Test setThreshold dengan nilai invalid (negative, non-numeric)
    - Test isAboveThreshold dengan berbagai amounts
    - Test clearThreshold
    - Test threshold persistence
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.7_

- [ ] 15. Update UIManager untuk kategori khusus dan highlighting
  - [ ] 15.1 Update UIManager untuk custom categories
    - Implementasi method renderCategoryDropdown(categories) untuk render dropdown dengan semua kategori
    - Implementasi method renderCustomCategoryList(customCategories) untuk display daftar kategori khusus
    - Implementasi method bindAddCustomCategory(handler) untuk bind add category event
    - Implementasi method bindDeleteCustomCategory(handler) untuk bind delete category event
    - Implementasi UI untuk form add custom category (input name, color picker)
    - Implementasi UI untuk list custom categories dengan delete buttons
    - _Requirements: 12.1, 12.4, 12.7, 12.9_

  - [ ] 15.2 Update UIManager untuk threshold highlighting
    - Implementasi method applyThresholdHighlighting(transactionElement, amount) untuk apply visual highlighting
    - Implementasi UI untuk threshold input field
    - Implementasi method bindSetThreshold(handler) untuk bind threshold change event
    - Implementasi styling untuk highlighted transactions (background color, border, atau badge)
    - Update renderTransactionList untuk apply highlighting berdasarkan threshold
    - _Requirements: 13.1, 13.4, 13.5, 13.6_

  - [ ]* 15.3 Write unit tests untuk UI updates
    - Test renderCategoryDropdown includes default and custom categories
    - Test renderCustomCategoryList displays all custom categories
    - Test applyThresholdHighlighting applies correct styling
    - Test threshold input validation
    - _Requirements: 12.4, 12.9, 13.4, 13.5_

- [ ] 16. Update ChartManager untuk custom categories
  - [ ] 16.1 Update ChartManager untuk support custom categories
    - Update method getCategoryColors() untuk include custom category colors
    - Update method preparePieChartData() untuk handle dynamic categories
    - Ensure chart updates ketika custom categories ditambahkan/dihapus
    - _Requirements: 12.9_

  - [ ]* 16.2 Write unit tests untuk ChartManager updates
    - Test preparePieChartData dengan custom categories
    - Test getCategoryColors returns correct colors untuk custom categories
    - _Requirements: 12.9_

- [ ] 17. Update AppController untuk wire fitur baru
  - [ ] 17.1 Update AppController
    - Initialize CategoryManager dan ThresholdManager
    - Implementasi method handleAddCustomCategory(event)
    - Implementasi method handleDeleteCustomCategory(name)
    - Implementasi method handleSetThreshold(value)
    - Wire CategoryManager dengan UIManager dan ChartManager
    - Wire ThresholdManager dengan UIManager
    - Update initialization flow untuk load custom categories dan threshold
    - _Requirements: 12.5, 12.6, 13.2, 13.3_

  - [ ]* 17.2 Write integration tests untuk fitur baru
    - Test complete flow: add custom category → use in transaction → display in chart
    - Test complete flow: set threshold → add transactions → verify highlighting
    - Test complete flow: delete custom category (with protection)
    - Test initialization flow: load custom categories and threshold from storage
    - _Requirements: 12.5, 12.6, 12.8, 13.2, 13.3, 13.4_

- [ ] 18. Update styling untuk fitur baru
  - [ ] 18.1 Add CSS untuk custom categories UI
    - Implementasi styling untuk custom category form (input, color picker, button)
    - Implementasi styling untuk custom category list dengan delete buttons
    - Implementasi styling untuk category badges atau labels
    - _Requirements: 12.1, 12.7_

  - [ ] 18.2 Add CSS untuk threshold highlighting
    - Implementasi styling untuk threshold input field
    - Implementasi styling untuk highlighted transactions (contrasting color, border, badge)
    - Ensure highlighting is visible dan accessible
    - _Requirements: 13.1, 13.4, 13.5_

- [ ] 19. Final integration dan testing
  - [ ] 19.1 Integration testing untuk semua fitur
    - Test interaksi antara custom categories, transactions, dan chart
    - Test interaksi antara threshold dan transaction list
    - Test edge cases: delete category in use, invalid threshold values
    - Test localStorage persistence untuk semua fitur baru
    - _Requirements: 12.5, 12.6, 12.8, 13.2, 13.3_

  - [ ]* 19.2 Write end-to-end tests untuk fitur baru
    - Test complete user flow: add custom category → add transaction with custom category → view in chart → delete category (protected)
    - Test complete user flow: set threshold → add transactions above/below threshold → verify highlighting → change threshold
    - Test persistence: add custom categories and set threshold → reload page → verify restoration
    - _Requirements: 12.5, 12.6, 12.8, 12.9, 13.2, 13.3, 13.4, 13.6_

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Integration tests validate component interactions and external dependencies
- Aplikasi menggunakan vanilla JavaScript tanpa framework
- Chart.js loaded dari CDN untuk visualisasi pie chart
- localStorage digunakan untuk persistensi data tanpa backend
- Semua error messages dalam Bahasa Indonesia
- Tasks 13-20 menambahkan fitur baru: kategori khusus dan highlighting pengeluaran
- Custom categories disimpan terpisah dari default categories di localStorage
- Threshold highlighting menggunakan visual cues (warna, border, atau badge) untuk transaksi di atas batas
