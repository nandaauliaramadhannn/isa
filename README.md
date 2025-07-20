Intelligence Socio Analytics (ISA)
==================================

Deskripsi:
----------
ISA adalah platform analitik media sosial berbasis Laravel dan Python yang digunakan untuk memantau opini publik, percakapan sosial, dan tren isu dari berbagai media sosial seperti Twitter, Facebook, Instagram, dan TikTok.

Fitur Utama:
------------
- Crawling data sosial media:
  - Twitter (tanpa akun, via Nitter)
  - Facebook, Instagram, TikTok (via Selenium)
- Analisis teks menggunakan AI (OpenAI GPT)
- Integrasi visualisasi (peta, statistik)
- Role-based login (admin & user)
- Manajemen API Key dan Topik Aktif
- Monitoring proses crawling secara real-time

Struktur Folder:
----------------
ISA/
├── app/
│   └── Services/Social/       # Service crawling via Laravel
├── python/
│   ├── main.py                # Menjalankan semua crawler
│   └── services/
│       ├── twitter.py
│       ├── facebook.py
│       ├── instagram.py
│       ├── tiktok.py
│       └── utils/helpers.py
├── resources/views/
│   └── socialcrawl/index.blade.php
├── routes/
│   └── web.php
└── public/

Cara Menjalankan:
-----------------
1. Install Laravel:
   - composer install
   - cp .env.example .env
   - php artisan key:generate
   - php artisan migrate

2. Jalankan Python virtual environment:
   - cd python
   - python3 -m venv venv
   - source venv/bin/activate
   - pip install -r requirements.txt

3. Jalankan server Laravel:
   - php artisan serve

4. Akses dari browser:
   - http://127.0.0.1:8000/app/socialcrawl

Dependensi Python:
------------------
- selenium
- requests
- beautifulsoup4
- lxml
- (opsional: undetected-chromedriver)

Konfigurasi ENV:
----------------
Tambahkan di .env Laravel:
OPENAI_API_KEY=your-openai-api-key

Catatan:
--------
- Untuk crawling Facebook, Instagram, dan TikTok diperlukan Google Chrome dan ChromeDriver
- Data yang dikumpulkan bersifat publik
- Gunakan dengan tanggung jawab dan sesuai hukum yang berlaku

Kontak:
-------
Pengembang: Nanda Aulia Ramadhan
Email     : nandaauliaramadhan308@gmail.com

