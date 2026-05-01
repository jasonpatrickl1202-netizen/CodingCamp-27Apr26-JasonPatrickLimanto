# Panduan Deployment - Visualisasi Pengeluaran & Anggaran

## 🚀 Cara Deploy

Aplikasi ini adalah static web app yang dapat di-deploy ke berbagai platform hosting gratis.

## 1. GitHub Pages

### Langkah-langkah:

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/expense-budget-visualizer.git
   git push -u origin main
   ```

2. **Aktifkan GitHub Pages**
   - Buka repository di GitHub
   - Pergi ke Settings > Pages
   - Pilih branch `main` dan folder `/ (root)`
   - Klik Save
   - Aplikasi akan tersedia di: `https://username.github.io/expense-budget-visualizer/`

### Keuntungan:
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Custom domain support
- ✅ Auto-deploy saat push

## 2. Netlify

### Langkah-langkah:

1. **Via Drag & Drop**
   - Buka [netlify.com](https://netlify.com)
   - Drag folder proyek ke Netlify Drop
   - Aplikasi langsung live!

2. **Via Git**
   - Connect repository GitHub
   - Build settings: (kosongkan, tidak perlu build)
   - Publish directory: `/` (root)
   - Deploy!

### Keuntungan:
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Custom domain gratis
- ✅ Deploy preview untuk PR
- ✅ Instant rollback

## 3. Vercel

### Langkah-langkah:

1. **Via CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via Dashboard**
   - Import repository dari GitHub
   - Framework Preset: Other
   - Deploy!

### Keuntungan:
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Edge network global
- ✅ Analytics built-in

## 4. Cloudflare Pages

### Langkah-langkah:

1. **Connect Git**
   - Buka [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect GitHub repository
   - Build settings: (kosongkan)
   - Deploy!

### Keuntungan:
- ✅ Gratis unlimited
- ✅ HTTPS otomatis
- ✅ CDN global
- ✅ Web Analytics gratis

## 5. Firebase Hosting

### Langkah-langkah:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Keuntungan:
- ✅ Gratis (10GB storage, 360MB/day transfer)
- ✅ HTTPS otomatis
- ✅ Custom domain
- ✅ CDN global

## 6. Surge.sh

### Langkah-langkah:

1. **Install Surge**
   ```bash
   npm install -g surge
   ```

2. **Deploy**
   ```bash
   surge
   ```

### Keuntungan:
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Custom domain
- ✅ Super cepat deploy

## 📦 Persiapan Sebelum Deploy

### 1. Verifikasi File Structure
```
expense-budget-visualizer/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── README.md
└── .gitignore
```

### 2. Test Lokal
- Buka `index.html` di browser
- Test semua fitur
- Verifikasi Chart.js loaded
- Test di berbagai browser

### 3. Optimize (Opsional)

#### Minify CSS
```bash
# Install cssnano
npm install -g cssnano-cli

# Minify
cssnano css/style.css css/style.min.css
```

#### Minify JavaScript
```bash
# Install terser
npm install -g terser

# Minify
terser js/app.js -o js/app.min.js -c -m
```

**Update index.html jika menggunakan minified files:**
```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/app.min.js"></script>
```

## 🔧 Konfigurasi Tambahan

### Custom Domain

Untuk semua platform di atas, Anda bisa menambahkan custom domain:

1. Beli domain (Namecheap, GoDaddy, dll)
2. Tambahkan CNAME record:
   ```
   www.yourdomain.com -> your-app.netlify.app
   ```
3. Tambahkan A record untuk apex domain (jika didukung)

### HTTPS

Semua platform di atas menyediakan HTTPS gratis via Let's Encrypt.

### Environment Variables

Jika perlu environment variables (untuk fitur future):

**Netlify/Vercel:**
- Tambahkan di dashboard Settings > Environment Variables

**GitHub Pages:**
- Gunakan GitHub Secrets untuk CI/CD

## 📊 Monitoring

### Google Analytics

Tambahkan di `index.html` sebelum `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🔒 Security Headers

Tambahkan file `netlify.toml` atau `vercel.json`:

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🚦 CI/CD

### GitHub Actions

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod
```

## 📱 PWA (Progressive Web App) - Opsional

Untuk membuat aplikasi installable:

1. **Buat `manifest.json`:**
```json
{
  "name": "Visualisasi Pengeluaran & Anggaran",
  "short_name": "Expense Tracker",
  "description": "Aplikasi pelacak pengeluaran dengan visualisasi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Tambahkan di `index.html`:**
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#667eea">
```

3. **Buat Service Worker** (opsional untuk offline support)

## 🎉 Selesai!

Aplikasi Anda sekarang live dan dapat diakses dari mana saja!

## 📞 Troubleshooting

### Chart.js tidak muncul
- Verifikasi koneksi internet
- Check console untuk error
- Pastikan CDN link benar

### Data hilang setelah deploy
- localStorage bersifat per-domain
- Data tidak ter-migrate antar domain
- User perlu input ulang di domain baru

### Styling tidak muncul
- Verifikasi path CSS relatif
- Check case-sensitive filenames
- Clear browser cache

## 🔗 Resources

- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
