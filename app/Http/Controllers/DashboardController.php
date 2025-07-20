<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Models\Topic;

class DashboardController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $today = now();
        $yesterday = now()->subDay();

        // Total
        $totalPosts     = Post::count();
        $totalTopics    = Topic::count();
        $recentPosts    = Post::latest()->take(10)->get();

        // Hari ini & kemarin
        $totalPostsToday     = Post::whereDate('created_at', $today)->count();
        $totalPostsYesterday = Post::whereDate('created_at', $yesterday)->count();

        $totalTopicsToday     = Topic::whereDate('created_at', $today)->count();
        $totalTopicsYesterday = Topic::whereDate('created_at', $yesterday)->count();

        $positiveToday = Post::whereHas('analysis', fn($q) => $q->where('sentiment', 'positive'))
            ->whereDate('created_at', $today)->count();
        $positiveYesterday = Post::whereHas('analysis', fn($q) => $q->where('sentiment', 'positive'))
            ->whereDate('created_at', $yesterday)->count();

        $negativeToday = Post::whereHas('analysis', fn($q) => $q->where('sentiment', 'negative'))
            ->whereDate('created_at', $today)->count();
        $negativeYesterday = Post::whereHas('analysis', fn($q) => $q->where('sentiment', 'negative'))
            ->whereDate('created_at', $yesterday)->count();

        // Statistik Sentimen
        $sentimentStats = Post::with('analysis')->get()
            ->groupBy(fn($p) => optional($p->analysis)->sentiment ?? 'unknown')
            ->map->count();

        // Perubahan %
        $change = fn($today, $yesterday) =>
            $yesterday > 0 ? number_format((($today - $yesterday) / $yesterday) * 100, 1) : 0;

        // Mapping wilayah → sentimen dominan
        $sentimentByArea = Post::with('analysis')
            ->get()
            ->groupBy('kecamatan')
            ->map(function ($posts) {
                return $posts->groupBy(fn($p) => optional($p->analysis)->sentiment ?? 'none')
                    ->map->count()
                    ->sortDesc()
                    ->keys()
                    ->first() ?? 'none';
            });

        return view('dashboard', [
            'user' => $user,
            'totalPosts' => $totalPosts,
            'totalTopics' => $totalTopics,
            'recentPosts' => $recentPosts,
            'sentimentStats' => $sentimentStats,
            'postChangePercent' => $change($totalPostsToday, $totalPostsYesterday),
            'topicChangePercent' => $change($totalTopicsToday, $totalTopicsYesterday),
            'positiveChangePercent' => $change($positiveToday, $positiveYesterday),
            'negativeChangePercent' => $change($negativeToday, $negativeYesterday),
            'sentimentByArea' => $sentimentByArea,
        ]);
    }
}
