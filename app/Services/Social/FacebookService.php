<?php

namespace App\Services\Social;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Str;

class FacebookService
{
    public static function crawlByKeyword(string $keyword, int $limit = 10): array
    {
        $results = [];

        $searchUrl = 'https://mbasic.facebook.com/search/posts/?q=' . urlencode($keyword);
        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ])->get($searchUrl);

        if ($response->failed()) {
            return [['error' => 'Gagal mengambil halaman Facebook.']];
        }

        $html = $response->body();
        $crawler = new Crawler($html);

        $crawler->filter('div')->each(function (Crawler $node) use (&$results, $limit) {
            if (count($results) >= $limit) return;

            $text = $node->text();

            // Skip komentar atau aktivitas ringan
            if (Str::contains($text, ['berkomentar', 'menyukai', 'membagikan', 'menanggapi'])) {
                return;
            }

            // Cari link ke post
            $link = null;
            $linkNode = $node->filter('a')->reduce(function (Crawler $a) {
                return Str::contains($a->text(), 'Lihat Selengkapnya') || Str::contains($a->attr('href'), '/story.php');
            })->first();

            if ($linkNode && $linkNode->count()) {
                $href = $linkNode->attr('href');
                $link = Str::startsWith($href, 'http') ? $href : 'https://mbasic.facebook.com' . $href;
            }

            // Filter panjang konten agar lebih relevan
            if (strlen($text) > 50) {
                $results[] = [
                    'platform'    => 'facebook',
                    'external_id' => uniqid('fb_'),
                    'text'        => Str::limit($text, 280),
                    'author'      => null, // tidak tersedia dari HTML
                    'url'         => $link,
                    'created_at'  => now()->toDateTimeString(),
                ];
            }
        });

        return $results;
    }
}
