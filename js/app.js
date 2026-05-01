// Expense Budget Visualizer Application
// Main application logic

// Storage keys
const STORAGE_KEYS = {
    TRANSACTIONS: 'expense-transactions',
    CUSTOM_CATEGORIES: 'expense-custom-categories',
    THRESHOLD: 'expense-threshold',
    THEME: 'expense-theme',
    SORT_PREFERENCE: 'expense-sort-preference'
};

// Default categories
const DEFAULT_CATEGORIES = {
    FOOD: 'Makanan',
    TRANSPORT: 'Transportasi',
    ENTERTAINMENT: 'Hiburan'
};

// Application state
let transactions = [];
let customCategories = [];
let expenseThreshold = null;
let chartInstance = null;
let currentTheme = 'light';
let currentSortBy = 'date-desc';
let currentMonthOffset = 0; // 0 = current month, -1 = previous month, etc.

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load data from localStorage
    loadTransactions();
    loadCustomCategories();
    loadThreshold();
    loadTheme();
    loadSortPreference();
    
    // Initialize UI
    renderTransactionList();
    renderTotalBalance();
    renderChart();
    renderCategoryDropdown();
    renderCustomCategoryList();
    renderMonthlySummary();
    
    // Bind event listeners
    bindEventListeners();
    
    console.log('Application initialized successfully');
}

// Event Listeners
function bindEventListeners() {
    // Transaction form submission
    const transactionForm = document.getElementById('transaction-form');
    transactionForm.addEventListener('submit', handleAddTransaction);
    
    // Custom category
    const addCategoryBtn = document.getElementById('add-custom-category');
    addCategoryBtn.addEventListener('click', handleAddCustomCategory);
    
    // Threshold
    const setThresholdBtn = document.getElementById('set-threshold');
    const clearThresholdBtn = document.getElementById('clear-threshold');
    setThresholdBtn.addEventListener('click', handleSetThreshold);
    clearThresholdBtn.addEventListener('click', handleClearThreshold);
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Sort
    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', handleSortChange);
    
    // Monthly navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
    nextMonthBtn.addEventListener('click', () => navigateMonth(1));
}

// Transaction Management
function handleAddTransaction(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearValidationErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    
    // Validate form
    const validation = validateTransaction(name, amount, category);
    if (!validation.isValid) {
        displayValidationErrors(validation.errors);
        return;
    }
    
    // Create transaction
    const transaction = {
        id: generateId(),
        name: name,
        amount: amount,
        category: category,
        timestamp: Date.now()
    };
    
    // Add to transactions array
    transactions.push(transaction);
    
    // Save to localStorage
    saveTransactions();
    
    // Update UI
    renderTransactionList();
    renderTotalBalance();
    renderChart();
    renderMonthlySummary();
    
    // Clear form
    clearForm();
}

function handleDeleteTransaction(id) {
    // Remove transaction from array
    transactions = transactions.filter(t => t.id !== id);
    
    // Save to localStorage
    saveTransactions();
    
    // Update UI
    renderTransactionList();
    renderTotalBalance();
    renderChart();
    renderMonthlySummary();
}

// Validation
function validateTransaction(name, amount, category) {
    const errors = {};
    let isValid = true;
    
    // Validate name
    if (!name || name.length === 0) {
        errors.name = 'Nama barang tidak boleh kosong';
        isValid = false;
    }
    
    // Validate amount
    if (!amount || isNaN(amount)) {
        errors.amount = 'Jumlah tidak boleh kosong';
        isValid = false;
    } else if (amount <= 0) {
        errors.amount = 'Jumlah harus lebih besar dari 0';
        isValid = false;
    }
    
    // Validate category
    if (!category || category.length === 0) {
        errors.category = 'Kategori harus dipilih';
        isValid = false;
    }
    
    return { isValid, errors };
}

function displayValidationErrors(errors) {
    for (const [field, message] of Object.entries(errors)) {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('input-error');
        }
    }
}

function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    const inputElements = document.querySelectorAll('.input-error');
    inputElements.forEach(el => {
        el.classList.remove('input-error');
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
}

// UI Rendering
function renderTransactionList() {
    const listContainer = document.getElementById('transaction-list');
    
    if (transactions.length === 0) {
        listContainer.innerHTML = '<div class="empty-state"><p>Belum ada transaksi. Tambahkan transaksi pertama Anda!</p></div>';
        return;
    }
    
    // Sort transactions
    const sortedTransactions = getSortedTransactions();
    
    listContainer.innerHTML = '';
    
    sortedTransactions.forEach(transaction => {
        const item = createTransactionElement(transaction);
        listContainer.appendChild(item);
    });
}

function getSortedTransactions() {
    const sorted = [...transactions];
    
    switch (currentSortBy) {
        case 'date-desc':
            sorted.sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'date-asc':
            sorted.sort((a, b) => a.timestamp - b.timestamp);
            break;
        case 'amount-desc':
            sorted.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            sorted.sort((a, b) => a.amount - b.amount);
            break;
        case 'category-asc':
            sorted.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'category-desc':
            sorted.sort((a, b) => b.category.localeCompare(a.category));
            break;
    }
    
    return sorted;
}

function createTransactionElement(transaction) {
    const item = document.createElement('div');
    item.className = 'transaction-item';
    
    // Apply threshold highlighting
    if (expenseThreshold !== null && transaction.amount > expenseThreshold) {
        item.classList.add('above-threshold');
    }
    
    item.innerHTML = `
        <div class="transaction-info">
            <div class="transaction-name">${escapeHtml(transaction.name)}</div>
            <div class="transaction-details">
                <span class="transaction-amount">${formatCurrency(transaction.amount)}</span>
                <span class="transaction-category">${escapeHtml(transaction.category)}</span>
            </div>
        </div>
        <button class="btn btn-danger" onclick="handleDeleteTransaction('${transaction.id}')">Hapus</button>
    `;
    
    return item;
}

function renderTotalBalance() {
    const balanceElement = document.getElementById('total-balance');
    const total = calculateTotalBalance();
    balanceElement.textContent = formatCurrency(total);
}

function renderCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    const currentValue = categorySelect.value;
    
    // Clear existing options except the first one
    categorySelect.innerHTML = '<option value="">Pilih kategori</option>';
    
    // Add default categories
    Object.values(DEFAULT_CATEGORIES).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    
    // Add custom categories
    customCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    // Restore previous value if it still exists
    if (currentValue) {
        categorySelect.value = currentValue;
    }
}

function renderCustomCategoryList() {
    const listContainer = document.getElementById('custom-category-list');
    
    if (customCategories.length === 0) {
        listContainer.innerHTML = '<p style="color: #999;">Belum ada kategori khusus</p>';
        return;
    }
    
    listContainer.innerHTML = '';
    
    customCategories.forEach(category => {
        const item = document.createElement('div');
        item.className = 'custom-category-item';
        item.innerHTML = `
            <div class="category-color-indicator" style="background-color: ${category.color}"></div>
            <span class="category-name">${escapeHtml(category.name)}</span>
            <button class="btn btn-danger" onclick="handleDeleteCustomCategory('${escapeHtml(category.name)}')">Hapus</button>
        `;
        listContainer.appendChild(item);
    });
}

// Chart Management
function renderChart() {
    const canvas = document.getElementById('expense-chart');
    const ctx = canvas.getContext('2d');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        return;
    }
    
    // Destroy existing chart
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Calculate category totals
    const categoryTotals = calculateCategoryTotals();
    
    // Check if there are any transactions
    if (categoryTotals.size === 0) {
        // Display empty state
        chartInstance = null;
        return;
    }
    
    // Prepare chart data
    const labels = Array.from(categoryTotals.keys());
    const data = Array.from(categoryTotals.values());
    const colors = labels.map(category => getCategoryColor(category));
    
    // Create chart
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Custom Category Management
function handleAddCustomCategory() {
    const nameInput = document.getElementById('custom-category-name');
    const colorInput = document.getElementById('custom-category-color');
    
    const name = nameInput.value.trim();
    const color = colorInput.value;
    
    // Validate name
    if (!name || name.length === 0) {
        alert('Nama kategori tidak boleh kosong');
        return;
    }
    
    // Check for duplicates (case-insensitive)
    const allCategories = [...Object.values(DEFAULT_CATEGORIES), ...customCategories.map(c => c.name)];
    if (allCategories.some(c => c.toLowerCase() === name.toLowerCase())) {
        alert('Kategori dengan nama tersebut sudah ada');
        return;
    }
    
    // Add custom category
    const category = {
        name: name,
        color: color,
        createdAt: Date.now()
    };
    
    customCategories.push(category);
    
    // Save to localStorage
    saveCustomCategories();
    
    // Update UI
    renderCategoryDropdown();
    renderCustomCategoryList();
    
    // Clear inputs
    nameInput.value = '';
    colorInput.value = '#FF5733';
}

function handleDeleteCustomCategory(name) {
    // Check if category is in use
    const inUse = transactions.some(t => t.category === name);
    
    if (inUse) {
        const count = transactions.filter(t => t.category === name).length;
        alert(`Tidak dapat menghapus kategori "${name}". Masih ada ${count} transaksi yang menggunakan kategori ini.`);
        return;
    }
    
    // Remove category
    customCategories = customCategories.filter(c => c.name !== name);
    
    // Save to localStorage
    saveCustomCategories();
    
    // Update UI
    renderCategoryDropdown();
    renderCustomCategoryList();
}

// Threshold Management
function handleSetThreshold() {
    const thresholdInput = document.getElementById('threshold-value');
    const value = parseFloat(thresholdInput.value);
    
    if (!value || isNaN(value) || value <= 0) {
        alert('Batas pengeluaran harus berupa angka positif');
        return;
    }
    
    expenseThreshold = value;
    
    // Save to localStorage
    saveThreshold();
    
    // Update UI
    renderTransactionList();
    
    alert(`Batas pengeluaran diatur ke ${formatCurrency(value)}`);
}

function handleClearThreshold() {
    expenseThreshold = null;
    
    // Save to localStorage
    saveThreshold();
    
    // Update UI
    renderTransactionList();
    
    // Clear input
    document.getElementById('threshold-value').value = '';
    
    alert('Batas pengeluaran telah dihapus');
}

// Sort Management
function handleSortChange(event) {
    currentSortBy = event.target.value;
    saveSortPreference();
    renderTransactionList();
}

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

function loadTheme() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.THEME);
        if (saved) {
            currentTheme = saved;
        }
        applyTheme();
    } catch (e) {
        console.error('Failed to load theme:', e);
    }
}

function saveTheme() {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    } catch (e) {
        console.error('Failed to save theme:', e);
    }
}

function loadSortPreference() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.SORT_PREFERENCE);
        if (saved) {
            currentSortBy = saved;
            document.getElementById('sort-by').value = currentSortBy;
        }
    } catch (e) {
        console.error('Failed to load sort preference:', e);
    }
}

function saveSortPreference() {
    try {
        localStorage.setItem(STORAGE_KEYS.SORT_PREFERENCE, currentSortBy);
    } catch (e) {
        console.error('Failed to save sort preference:', e);
    }
}

// Monthly Summary Management
function navigateMonth(offset) {
    currentMonthOffset += offset;
    renderMonthlySummary();
}

function renderMonthlySummary() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + currentMonthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    // Update month display
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    document.getElementById('current-month-display').textContent = 
        `${monthNames[month]} ${year}`;
    
    // Filter transactions for this month
    const monthTransactions = transactions.filter(t => {
        const transDate = new Date(t.timestamp);
        return transDate.getFullYear() === year && transDate.getMonth() === month;
    });
    
    const contentContainer = document.getElementById('monthly-summary-content');
    
    if (monthTransactions.length === 0) {
        contentContainer.innerHTML = '<p class="empty-state">Belum ada transaksi untuk bulan ini</p>';
        return;
    }
    
    // Calculate totals by category
    const categoryTotals = {};
    let grandTotal = 0;
    
    monthTransactions.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        grandTotal += t.amount;
    });
    
    // Render summary cards
    contentContainer.innerHTML = '';
    
    // Overall summary card
    const overallCard = document.createElement('div');
    overallCard.className = 'monthly-card';
    overallCard.innerHTML = `
        <h3>Ringkasan Keseluruhan</h3>
        <div class="monthly-stat">
            <span class="monthly-stat-label">Total Transaksi:</span>
            <span class="monthly-stat-value">${monthTransactions.length}</span>
        </div>
        <div class="monthly-stat">
            <span class="monthly-stat-label">Rata-rata per Transaksi:</span>
            <span class="monthly-stat-value">${formatCurrency(grandTotal / monthTransactions.length)}</span>
        </div>
        <div class="monthly-total">
            <span class="monthly-total-label">Total Pengeluaran:</span>
            <span class="monthly-total-value">${formatCurrency(grandTotal)}</span>
        </div>
    `;
    contentContainer.appendChild(overallCard);
    
    // Category breakdown card
    const categoryCard = document.createElement('div');
    categoryCard.className = 'monthly-card';
    let categoryHTML = '<h3>Pengeluaran per Kategori</h3>';
    
    Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, total]) => {
            const percentage = ((total / grandTotal) * 100).toFixed(1);
            categoryHTML += `
                <div class="monthly-stat">
                    <span class="monthly-stat-label">${escapeHtml(category)}:</span>
                    <span class="monthly-stat-value">${formatCurrency(total)} (${percentage}%)</span>
                </div>
            `;
        });
    
    categoryCard.innerHTML = categoryHTML;
    contentContainer.appendChild(categoryCard);
}

// Calculations
function calculateTotalBalance() {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

function calculateCategoryTotals() {
    const totals = new Map();
    
    transactions.forEach(transaction => {
        const current = totals.get(transaction.category) || 0;
        totals.set(transaction.category, current + transaction.amount);
    });
    
    return totals;
}

// Storage Management
function saveTransactions() {
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Penyimpanan penuh. Silakan hapus beberapa transaksi lama.');
        } else {
            console.error('Failed to save transactions:', e);
        }
    }
}

function loadTransactions() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        if (data) {
            const parsed = JSON.parse(data);
            transactions = Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        console.error('Failed to load transactions:', e);
        transactions = [];
    }
}

function saveCustomCategories() {
    try {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_CATEGORIES, JSON.stringify(customCategories));
    } catch (e) {
        console.error('Failed to save custom categories:', e);
    }
}

function loadCustomCategories() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES);
        if (data) {
            const parsed = JSON.parse(data);
            customCategories = Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        console.error('Failed to load custom categories:', e);
        customCategories = [];
    }
}

function saveThreshold() {
    try {
        localStorage.setItem(STORAGE_KEYS.THRESHOLD, JSON.stringify({ value: expenseThreshold }));
    } catch (e) {
        console.error('Failed to save threshold:', e);
    }
}

function loadThreshold() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.THRESHOLD);
        if (data) {
            const parsed = JSON.parse(data);
            expenseThreshold = parsed.value;
            
            // Update input field if threshold exists
            if (expenseThreshold !== null) {
                document.getElementById('threshold-value').value = expenseThreshold;
            }
        }
    } catch (e) {
        console.error('Failed to load threshold:', e);
        expenseThreshold = null;
    }
}

// Utility Functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function formatCurrency(amount) {
    return `Rp ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

function getCategoryColor(category) {
    // Check if it's a custom category
    const customCategory = customCategories.find(c => c.name === category);
    if (customCategory) {
        return customCategory.color;
    }
    
    // Default category colors
    const colorMap = {
        'Makanan': '#FF6384',
        'Transportasi': '#36A2EB',
        'Hiburan': '#FFCE56'
    };
    
    return colorMap[category] || '#999999';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Check localStorage availability
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Check on initialization
if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available. Data will not persist.');
    alert('Peringatan: Penyimpanan tidak tersedia. Data akan hilang saat halaman di-refresh.');
}
