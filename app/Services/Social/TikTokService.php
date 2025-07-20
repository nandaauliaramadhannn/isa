<?php

namespace App\Services\Social;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Str;

class TikTokService
{
    public static function crawlByKeyword(string $keyword, int $limit = 10): array
    {
        $results = [];

        $searchUrl = "https://www.google.com/search?q=site:tiktok.com+\"" . urlencode($keyword) . "\"";

        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Accept-Language' => 'id-ID,id;q=0.9,en;q=0.8'
        ])->get($searchUrl);

        if ($response->failed()) {
            return [['error' => 'Gagal mengambil hasil pencarian Google untuk TikTok.']];
        }

        $html = $response->body();
        $crawler = new Crawler($html);

        $crawler->filter('div.g')->each(function (Crawler $node) use (&$results, $limit) {
            if (count($results) >= $limit) return;

            $title = $node->filter('h3')->count() ? $node->filter('h3')->text('') : null;
            $link = $node->filter('a')->count() ? $node->filter('a')->attr('href') : null;

            if ($link && Str::contains($link, 'tiktok.com')) {
                $results[] = [
                    'platform'    => 'tiktok',
                    'external_id' => uniqid('tt_'),
                    'text'        => Str::limit($title, 280),
                    'author'      => null,
                    'created_at'  => now()->toDateTimeString(),
                    'url'         => $link,
                ];
            }
        });

        return $results;
    }
}
