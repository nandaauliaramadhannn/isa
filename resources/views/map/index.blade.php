@extends('layouts.app', ['title' => 'Peta Opini Sosial' ,'pageTitle'=>'Peta Opini Sosial'])

@section('content')
<div class="container">
    <h2 class="mb-4 text-xl font-semibold">Peta Persebaran Opini Sosial (Kabupaten Bekasi)</h2>
    <div id="map" style="height: 500px; width: 100%;"></div>
</div>
@endsection

@push('scripts')
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>
    const map = L.map('map').setView([-6.25, 107.1], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const areaStats = @json($areaStats);
    const colors = {
        'positive': 'green',
        'negative': 'red',
        'neutral': 'orange'
    };

    for (const [name, data] of Object.entries(areaStats)) {
        L.circleMarker([data.lat, data.lng], {
            radius: 12,
            fillColor: colors[data.sentiment] || 'gray',
            color: '#333',
            weight: 1,
            fillOpacity: 0.7
        }).addTo(map).bindPopup(`<strong>${name}</strong><br>Sentimen: ${data.sentiment}`);
    }
</script>
@endpush
