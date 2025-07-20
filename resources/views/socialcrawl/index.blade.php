@extends('layouts.app', ['title' => 'Crawling', 'pageTitle' => 'Crawling'])

@section('content')
<div class="dashboard-card mb-4">
    <div class="card-header">
        <h5 class="card-title mb-0">Crawling Data Sosial Media</h5>
    </div>
    <div class="card-body">
        <button id="startCrawl" class="btn btn-primary mb-3">
            <i class="fas fa-sync-alt"></i> Mulai Crawling
        </button>

        <div id="progressWrapper" class="mb-3 d-none">
            <label>Progress Crawling:</label>
            <div class="progress">
                <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated"
                     role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    0%
                </div>
            </div>
        </div>

        <div id="resultTable" class="table-responsive d-none">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Topik</th>
                        <th>Konten</th>
                        <th>Author</th>
                        <th>Waktu Posting</th>
                    </tr>
                </thead>
                <tbody id="resultBody"></tbody>
            </table>
        </div>

        <div id="errorLog" class="alert alert-danger d-none"></div>
    </div>
</div>
@endsection

@push('js')
<script>
let pollingInterval = null;

function updateProgress(value) {
    const bar = document.getElementById('progressBar');
    bar.style.width = value + '%';
    bar.setAttribute('aria-valuenow', value);
    bar.innerText = value + '%';
}

document.getElementById('startCrawl').addEventListener('click', function () {
    document.getElementById('progressWrapper').classList.remove('d-none');
    document.getElementById('resultTable').classList.add('d-none');
    document.getElementById('errorLog').classList.add('d-none');
    document.getElementById('resultBody').innerHTML = '';
    document.getElementById('errorLog').innerHTML = '';
    updateProgress(0);

    // Jalankan crawling backend
    fetch("{{ route('admin.socialcrawl.run') }}", {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': "{{ csrf_token() }}",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    // Mulai polling
    pollingInterval = setInterval(fetchProgress, 1000);
});

function fetchProgress() {
    fetch("{{ route('admin.socialcrawl.progress') }}")
        .then(response => response.json())
        .then(data => {
            updateProgress(data.progress);

            if (data.done) {
                clearInterval(pollingInterval);
                document.getElementById('resultTable').classList.remove('d-none');
                document.getElementById('progressWrapper').classList.add('d-none');

                if (data.errors && data.errors.length) {
                    const errorDiv = document.getElementById('errorLog');
                    errorDiv.classList.remove('d-none');
                    data.errors.forEach(err => {
                        errorDiv.innerHTML += `<div>${err}</div>`;
                    });
                }

                if (data.data && data.data.length) {
                    const resultBody = document.getElementById('resultBody');
                    data.data.forEach(item => {
                        const row = `<tr>
                            <td>${item.platform}</td>
                            <td>${item.topic}</td>
                            <td>${item.content}</td>
                            <td>${item.author}</td>
                            <td>${new Date(item.created_at).toLocaleString()}</td>
                        </tr>`;
                        resultBody.innerHTML += row;
                    });
                }
            }
        });
}
</script>
@endpush
