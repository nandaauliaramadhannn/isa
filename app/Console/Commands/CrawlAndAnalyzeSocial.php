<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Social\TwitterService;
use App\Services\Social\FacebookService;
use App\Services\Social\InstagramService;
use App\Services\Social\TikTokService;
use App\Services\OpenAiService;
use App\Models\Post;
use App\Models\Topic;

class CrawlAndAnalyzeSocial extends Command
{
    protected $signature = 'crawl:analyze';
    protected $description = 'Crawl media sosial dan analisis isi kontennya';

    public function handle()
    {
        $topics = Topic::where('is_active', true)->get();
        $apiKey = config('services.isa_default_api_key'); // letakkan di config/services.php

        foreach ($topics as $topic) {
            $this->info("Memproses topik: {$topic->title}");

            $sources = [
                'twitter'   => TwitterService::crawlByKeyword($topic->title),
                'facebook'  => FacebookService::crawlByKeyword($topic->title),
                'instagram' => InstagramService::crawlByHashtag($topic->title),
                'tiktok'    => TikTokService::crawlByKeyword($topic->title),
            ];

            foreach ($sources as $platform => $posts) {
                foreach ($posts as $postData) {
                    $content = $postData['text'];

                    // Simpan post
                    $post = Post::create([
                        'external_id' => md5($content),
                        'topic_id'    => $topic->id,
                        'platform'    => $platform,
                        'content'     => $content,
                        'posted_at'   => now(),
                        'author'      => 'anonim',
                        'raw_data'    => json_encode($postData),
                    ]);

                    // Analisa
                    $analysis = OpenAiService::analyze($content, $apiKey);
                    $post->analysis()->create([
                        'sentiment'      => $analysis['choices'][0]['message']['content'] ?? '-',
                        'emotion'        => null,
                        'topics'         => null,
                        'named_entities' => null,
                        'risk_score'     => null,
                        'analyzed_at'    => now(),
                    ]);

                    $this->line("✓ Analisa selesai untuk platform $platform");
                }
            }
        }

        $this->info('Crawling & analisis selesai.');
    }
}
