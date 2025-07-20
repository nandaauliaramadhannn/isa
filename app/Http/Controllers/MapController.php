<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index()
    {
        // Contoh data manual, bisa diganti ambil dari DB (tabel posts)
        $areaStats = [
            'Cikarang Utara' => [
                'lat' => -6.283,
                'lng' => 107.149,
                'sentiment' => 'positive',
            ],
            'Tambun Selatan' => [
                'lat' => -6.244,
                'lng' => 107.024,
                'sentiment' => 'negative',
            ],
            'Babelan' => [
                'lat' => -6.133,
                'lng' => 107.046,
                'sentiment' => 'neutral',
            ],
            'Cibitung' => [
                'lat' => -6.259,
                'lng' => 107.107,
                'sentiment' => 'positive',
            ],
        ];

        return view('map.index', compact('areaStats'));
    }
}

