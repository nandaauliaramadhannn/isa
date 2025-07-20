<?php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Topic;
use App\Models\Source;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\Social\TikTokService;
use App\Services\Social\TwitterService;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Session;
use App\Services\Social\FacebookService;
use RealRashid\SweetAlert\Facades\Alert;
use App\Services\Social\InstagramService;

class SocialCrawlController extends Controller
{
    public function index()
    {
        return view('socialcrawl.index');
    }
    public function run(Request $request)
    {
        Session::put('crawl_progress', 0);
        Session::put('crawl_results', []);
        Session::put('crawl_errors', []);

        $collected = [];
        $errors = [];

        $keywords = Topic::where('is_active', true)->pluck('title')->toArray();

        if (empty($keywords)) {
            $errors[] = 'Tidak ada topik aktif untuk crawling.';
            Session::put('crawl_progress', 100);
            Session::put('crawl_errors', $errors);
            Session::put('crawl_results', []);

            return response()->json([
                'success' => false,
                'message' => 'Tidak ada topik aktif untuk crawling.'
            ], 422);
        }

        try {
            Session::put('crawl_progress', 10);
            $allResults = [];

            foreach ($keywords as $keyword) {
                $results = [];

                try {
                    $results = array_merge(
                        FacebookService::crawlByKeyword($keyword),
                        InstagramService::crawlByHashtag($keyword),
                        TikTokService::crawlByKeyword($keyword),
                        TwitterService::crawlByKeyword($keyword)
                    );
                } catch (\Exception $e) {
                    $errors[] = "Gagal crawling keyword '$keyword': " . $e->getMessage();
                    Log::error("Crawl error", ['keyword' => $keyword, 'error' => $e->getMessage()]);
                    continue;
                }

                $allResults = array_merge($allResults, $results);
            }

            // Proses dan simpan ke DB
            foreach ($allResults as $item) {
                try {
                    $platform = $item['platform'] ?? 'unknown';
                    $externalId = $item['external_id'] ?? md5($item['text'] ?? '');

                    if (Post::where('external_id', $externalId)->exists()) {
                        continue;
                    }

                    $source = Source::firstOrCreate(
                        [
                            'platform' => $platform,
                            'source_name' => $item['author'] ?? ucfirst($platform),
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'url' => $item['url'] ?? null,
                            'created_by' => auth()->id() ?? null,
                        ]
                    );

                    $topic = Topic::where('is_active', true)->first();

                    $post = Post::create([
                        'id' => (string) Str::uuid(),
                        'source_id' => $source->id,
                        'topic_id' => $topic?->id,
                        'external_id' => $externalId,
                        'platform' => $platform,
                        'content' => $item['text'] ?? '',
                        'author' => $item['author'] ?? null,
                        'posted_at' => $item['created_at'] ?? now(),
                        'raw_data' => json_encode($item),
                    ]);

                    $collected[] = $post;
                } catch (\Exception $e) {
                    $errors[] = "Gagal menyimpan post: " . $e->getMessage();
                    Log::error('DB Save Error', ['item' => $item, 'message' => $e->getMessage()]);
                }
            }

            Session::put('crawl_progress', 100);
            Session::put('crawl_results', $collected);
            Session::put('crawl_errors', $errors);

            return response()->json([
                'success' => true,
                'message' => 'Crawling selesai.',
                'count' => count($collected),
                'data' => $collected,
                'errors' => $errors,
            ]);

        } catch (\Throwable $e) {
            Log::error('Crawl exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            $errors[] = 'Exception: ' . $e->getMessage();
            Session::put('crawl_errors', $errors);
            Session::put('crawl_progress', 100);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi exception saat crawling.',
                'errors' => $errors,
            ], 500);
        }
    }


    public function progress()
    {
        $progress = Session::get('crawl_progress', 0);
        $data = Session::get('crawl_results', []);
        $errors = Session::get('crawl_errors', []);

        $done = $progress >= 100;

        return response()->json([
            'progress' => $progress,
            'data' => $data,
            'errors' => $errors,
            'done' => $done,
        ]);
    }
}
