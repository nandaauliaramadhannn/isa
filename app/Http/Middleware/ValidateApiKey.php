<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ApiKey;

class ValidateApiKey
{
    public function handle(Request $request, Closure $next)
    {
        $key = $request->header('X-API-KEY');
        $apiKey = ApiKey::where('key', $key)->first();

        if (!$apiKey) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $request->merge(['api_key_id' => $apiKey->id]);

        return $next($request);
    }
}
