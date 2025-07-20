<?php

namespace App\Services\Social;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Str;

class TwitterService
{
    public static function crawlByKeyword(string $keyword, int $limit = 10): array
    {
        $results = [];
        $encoded = urlencode($keyword);
        $url = "https://nitter.net/search?f=tweets&q={$encoded}";

        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        ])->get($url);

        if ($response->failed()) {
            return [['error' => 'Gagal mengakses Nitter.']];
        }

        $crawler = new Crawler($response->body());

        $crawler->filter('.timeline-item')->each(function (Crawler $node) use (&$results, $limit) {
            if (count($results) >= $limit) return;

            try {
                $contentNode = $node->filter('.tweet-content');
                $authorNode = $node->filter('.username');
                $dateNode = $node->filter('span.tweet-date a');
                $linkNode = $node->filter('.tweet-link');

                $text = $contentNode->count() ? trim($contentNode->text()) : null;
                $author = $authorNode->count() ? trim($authorNode->text()) : null;
                $date = $dateNode->count() ? trim($dateNode->attr('title')) : now()->toDateTimeString();
                $link = $linkNode->count() ? 'https://nitter.net' . $linkNode->attr('href') : null;

                if ($text) {
                    $results[] = [
                        'platform'    => 'twitter',
                        'external_id' => uniqid('tw_'),
                        'text'        => Str::limit($text, 280),
                        'author'      => $author,
                        'created_at'  => $date,
                        'url'         => $link,
                    ];
                }
            } catch (\Exception $e) {
                // skip if any parsing error
            }
        });

        return $results;
    }
}
