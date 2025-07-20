import hashlib
import re
from datetime import datetime

def clean_text(text):
    """Membersihkan teks dari spasi ekstra, HTML, dan karakter aneh."""
    return re.sub(r'\s+', ' ', text).strip()

def generate_external_id(text):
    """Membuat ID eksternal unik dari isi konten (untuk disimpan di database Laravel)."""
    return hashlib.md5(text.encode('utf-8')).hexdigest()

def parse_date(date_str, fmt='%Y-%m-%d %H:%M:%S'):
    """Mengubah string tanggal ke format datetime Python."""
    try:
        return datetime.strptime(date_str, fmt)
    except ValueError:
        return datetime.utcnow()

def format_result(platform, text, author=None, created_at=None, url=None):
    """Standarisasi hasil crawling agar formatnya seragam."""
    return {
        'platform': platform,
        'text': clean_text(text),
        'author': author,
        'created_at': created_at.isoformat() if isinstance(created_at, datetime) else created_at,
        'external_id': generate_external_id(text),
        'url': url
    }
