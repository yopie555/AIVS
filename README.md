# AI Video Storyteller - Company Profile Website

Website company profile untuk startup teknologi AI Video Storyteller dengan efek parallax dan desain futuristik hitam-ungu.

## 📁 Struktur File

```
technopreneur/
├── index.html              # Halaman utama website
├── styles.css              # Stylesheet dengan tema futuristik
├── script.js               # JavaScript untuk parallax & animasi
├── company_profile_ai_video_storyteller.md  # Dokumen company profile lengkap
└── README.md               # File ini
```

## 🎨 Fitur Website

### Desain & Tema
- **Tema Futuristik**: Hitam dominan + ungu neon + aksen biru elektrik
- **Fully Responsive**: Optimal di desktop, tablet, dan mobile
- **Modern UI**: Card-based layout dengan glassmorphism effect

### Animasi & Interaksi
- **Parallax Scrolling**: Multiple layers dengan kecepatan berbeda
- **Scroll Animations**: Fade-in, slide-in, dan scale effects
- **Interactive Cards**: Hover effects dengan 3D transform
- **Loading Screen**: Animasi loading yang smooth
- **Typing Effect**: Hero description dengan animasi ketik
- **Floating Particles**: Partikel animasi di background

### Section Website
1. **Hero Section**: Landing dengan efek parallax
2. **About Section**: Informasi perusahaan dengan statistik animasi
3. **Services Section**: 6 layanan utama dalam grid cards
4. **Technology Stack**: Teknologi yang digunakan
5. **Roadmap**: Timeline 3 tahun dengan efek parallax
6. **Team Section**: Tim dan peran masing-masing
7. **Contact Section**: Form kontak dan informasi
8. **Footer**: Links dan informasi tambahan

### Fitur Tambahan
- **Navigation Bar**: Sticky navbar dengan scroll effect
- **Mobile Menu**: Hamburger menu untuk mobile
- **Form Validation**: Validasi form kontak real-time
- **Smooth Scrolling**: Scroll halus antar section
- **Performance Optimized**: Throttled scroll events
- **Easter Egg**: Konami code untuk surprise effect 🌈

## 🚀 Cara Menggunakan

### Langsung Buka
1. Buka file `index.html` di browser modern (Chrome, Firefox, Safari, Edge)

### Local Development
```bash
# Serve dengan Python 3
python -m http.server 8000

# Atau dengan Node.js (jika ada live server)
npx live-server
```

Kemudian buka `http://localhost:8000` di browser.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Semantic markup
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties, Backdrop Filter)
- **Vanilla JavaScript**: Tanpa dependencies, performa tinggi
- **Google Fonts**: Inter font family
- **CSS Variables**: Mudah customisasi warna dan tema

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🎯 Customization

### Mengubah Warna Tema
Edit CSS Variables di `styles.css`:

```css
:root {
    --primary-color: #a855ff;    /* Ungu neon */
    --accent-color: #38bdf8;     /* Biru elektrik */
    --primary-bg: #050509;       /* Background utama */
    --secondary-bg: #0b0b12;     /* Background secondary */
}
```

### Mengubah Konten
Edit langsung di `index.html` untuk mengubah:
- Text dan judul
- Informasi kontak
- Layanan dan technology stack
- Timeline roadmap

### Menambah Section
1. Tambah section baru di `index.html`
2. Tambah styling di `styles.css`
3. Tambah animasi scroll di `script.js`

## ⚡ Performance Features

- **Throttled Scroll Events**: Mencegah jank saat scroll
- **Intersection Observer**: Efficient scroll animations
- **CSS Transforms**: Hardware accelerated animations
- **Optimized Images**: Gradient backgrounds instead of heavy images
- **Minimal Dependencies**: Hanya menggunakan vanilla JavaScript

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

Website ini dibuat sebagai bagian dari project technopreneur. Bebas digunakan dan dimodifikasi untuk keperluan pembelajaran dan pengembangan.

## 🤝 Contributing

Jika ingin menambah fitur atau improvement:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📞 Support

Untuk pertanyaan atau bantuan, hubungi:
- Email: hello@aivideostoryteller.com
- Location: Yogyakarta, Indonesia

---

**Made with ❤️ using HTML, CSS, and Vanilla JavaScript**