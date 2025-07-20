@extends('layouts.app', ['title' => 'Dashboard', 'pageTitle' => 'Dashboard'])

@section('content')
<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="metric-card">
            <div class="metric-icon bg-primary"><i class="fas fa-chart-line"></i></div>
            <div class="metric-content">
                <h3 class="metric-number">
                    {{ $totalPosts }}
                    <div class="metric-change {{ $postChangePercent >= 0 ? 'positive' : 'negative' }}">
                        <i class="fas fa-arrow-{{ $postChangePercent >= 0 ? 'up' : 'down' }}"></i>
                        {{ abs($postChangePercent) }}%
                    </div>
                </h3>
                <p class="metric-label">Total Berita</p>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="metric-card">
            <div class="metric-icon bg-success"><i class="fas fa-folder"></i></div>
            <div class="metric-content">
                <h3 class="metric-number">
                    {{ $totalTopics }}
                    <div class="metric-change {{ $topicChangePercent >= 0 ? 'positive' : 'negative' }}">
                        <i class="fas fa-arrow-{{ $topicChangePercent >= 0 ? 'up' : 'down' }}"></i>
                        {{ abs($topicChangePercent) }}%
                    </div>
                </h3>
                <p class="metric-label">Topik Terpantau</p>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="metric-card">
            <div class="metric-icon bg-info"><i class="fas fa-smile"></i></div>
            <div class="metric-content">
                <h3 class="metric-number">
                    {{ $sentimentStats['positive'] ?? 0 }}
                    <div class="metric-change {{ $positiveChangePercent >= 0 ? 'positive' : 'negative' }}">
                        <i class="fas fa-arrow-{{ $positiveChangePercent >= 0 ? 'up' : 'down' }}"></i>
                        {{ abs($positiveChangePercent) }}%
                    </div>
                </h3>
                <p class="metric-label">Sentimen Positif</p>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="metric-card">
            <div class="metric-icon bg-danger"><i class="fas fa-frown"></i></div>
            <div class="metric-content">
                <h3 class="metric-number">
                    {{ $sentimentStats['negative'] ?? 0 }}
                    <div class="metric-change {{ $negativeChangePercent >= 0 ? 'positive' : 'negative' }}">
                        <i class="fas fa-arrow-{{ $negativeChangePercent >= 0 ? 'up' : 'down' }}"></i>
                        {{ abs($negativeChangePercent) }}%
                    </div>
                </h3>
                <p class="metric-label">Sentimen Negatif</p>
            </div>
        </div>
    </div>
</div>

{{-- Map + Pie Chart --}}
<div class="row g-4 mb-4">
    <div class="col-lg-8">
        <div class="dashboard-card">
            <div class="card-header">
                <h5 class="card-title">Peta Sentimen Wilayah (Kabupaten Bekasi)</h5>
            </div>
            <div class="card-body">
                <div id="map" style="height: 400px; width: 100%;"></div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="dashboard-card">
            <div class="card-header"><h5 class="card-title">Distribusi Sentimen</h5></div>
            <div class="card-body">
                <canvas id="sentimentPieChart" height="300"></canvas>
            </div>
        </div>
    </div>
</div>
@endsection

@push('js')
<!-- Leaflet & Chart.js -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    // Inisialisasi Map
    const map = L.map('map').setView([-6.25, 107.1], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const sentimentData = @json($sentimentByArea);
    const colors = {
        'positive': '#4CAF50',
        'negative': '#F44336',
        'neutral':  '#FFC107',
        'none':     '#E0E0E0'
    };

    fetch('/bekasikab.geojson')
        .then(res => res.json())
        .then(geojson => {
            L.geoJSON(geojson, {
                style: feature => {
                    const kec = feature.properties.kecamatan || feature.properties.name;
                    const color = colors[sentimentData[kec] || 'none'];
                    return {
                        color: '#333',
                        weight: 1,
                        fillColor: color,
                        fillOpacity: 0.6
                    };
                },
                onEachFeature: (feature, layer) => {
                    const kec = feature.properties.kecamatan || feature.properties.name;
                    const sentiment = sentimentData[kec] || 'Tidak ada data';
                    layer.bindPopup(`<strong>${kec}</strong><br>Sentimen: ${sentiment}`);
                }
            }).addTo(map);
        });

    // Pie Chart
    const ctx = document.getElementById('sentimentPieChart').getContext('2d');
    const stats = @json($sentimentStats);
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positif', 'Negatif', 'Netral'],
            datasets: [{
                data: [
                    stats.positive ?? 0,
                    stats.negative ?? 0,
                    stats.neutral ?? 0
                ],
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
            }]
        },
        options: {
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
</script>
@endpush
