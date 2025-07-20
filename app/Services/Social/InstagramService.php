<?php
namespace App\Services\Social;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class InstagramService
{
    public static function crawlByHashtag(string $hashtag, int $limit = 10): array
    {
        $results = [];

        $searchUrl = "https://www.google.com/search?q=site:instagram.com+%23" . urlencode($hashtag);
        $html = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0'
        ])->get($searchUrl)->body();

        $crawler = new Crawler($html);
        $crawler->filter('div.g')->each(function ($node) use (&$results, $limit) {
            if (count($results) >= $limit) return;

            $title = $node->filter('h3')->text('');
            $link  = $node->filter('a')->attr('href');

            $results[] = [
                'id' => uniqid('ig_'),
                'text' => $title,
                'author' => null,
                'created_at' => now()->toDateTimeString(),
                'url' => $link,
            ];
        });

        return $results;
    }
}
