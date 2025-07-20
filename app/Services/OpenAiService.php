<?php
namespace App\Services;

use App\Models\ApiKey;
use App\Models\ApiLog;
use Illuminate\Support\Facades\Http;

class OpenAiService
{
    public static function analyze(string $content, string $apiKeyUuid): array
    {
        $apiKey = ApiKey::where('key', $apiKeyUuid)->firstOrFail();

        $requestPayload = [
            'model' => 'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => 'Analyze sentiment, emotion, and topic from text'],
                ['role' => 'user', 'content' => $content],
            ],
            'temperature' => 0.7,
        ];

        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->post('https://api.openai.com/v1/chat/completions', $requestPayload);

        $result = $response->json();
        $cost = 0.002; // Estimasi biaya per request

        // Simpan log
        ApiLog::create([
            'api_key_id' => $apiKey->id,
            'endpoint' => 'openai.analyze',
            'request_data' => $requestPayload,
            'response_data' => $result,
            'cost' => $cost,
            'called_at' => now(),
        ]);

        // Update usage
        $apiKey->increment('usage_count');
        $apiKey->increment('usage_cost', $cost);

        return $result;
    }
}
