@extends('layouts.app', ['title' => 'Topic', 'pageTitle' => 'Topic'])

@section('content')
<div class="dashboard-card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Topic List</h5>
        <!-- Tombol Tambah Topic -->
        <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#createTopicModal">
            <i class="fas fa-plus"></i> Tambah Topic
        </button>
    </div>

    <div class="card-body">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Status</th>
                    <th>Dibuat Oleh</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($topics as $topic)
                    <tr>
                        <td>{{ $topic->title }}</td>
                        <td>
                            @if ($topic->is_active)
                                <span class="badge bg-success">Aktif</span>
                            @else
                                <span class="badge bg-secondary">Tidak Aktif</span>
                            @endif
                        </td>
                        <td>{{ $topic->createdBy->name ?? '-' }}</td>
                        <td>{{ $topic->created_at->format('d F Y') }}</td> <!-- Format tanggal contoh: 1 Januari 2025 -->
                        <td>{{ $topic->updated_at->format('d F Y') }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editTopicModal-{{ $topic->id }}">
                                Edit
                            </button>

                            <form id="delete-form-{{ $topic->id }}" action="{{ route('admin.topic.destroy', $topic->id) }}" method="POST" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="button" class="btn btn-danger btn-sm" onclick="confirmDelete('{{ $topic->id }}')">
                                    Delete
                                </button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="text-center text-muted">Tidak ada topic yang tersedia.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Modal Tambah -->
<div class="modal fade" id="createTopicModal" tabindex="-1" aria-labelledby="createTopicLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form action="{{ route('admin.topic.store') }}" method="POST" class="modal-content">
            @csrf
            <div class="modal-header">
                <h5 class="modal-title" id="createTopicLabel">Tambah Topik Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Judul Topik <span class="text-danger">*</span></label>
                    <input type="text" name="title" class="form-control" required>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" name="is_active" id="is_active" value="1">
                    <label class="form-check-label" for="is_active">Aktifkan Topik Ini</label>
                </div>

                <input type="hidden" name="created_by" value="{{ auth()->user()->id }}">
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Simpan</button>
            </div>
        </form>
    </div>
</div>

<!-- Modal Edit (ditempatkan di luar tabel, sesuai topic) -->
@foreach ($topics as $topic)
    <div class="modal fade" id="editTopicModal-{{ $topic->id }}" tabindex="-1" aria-labelledby="editTopicLabel-{{ $topic->id }}" aria-hidden="true">
        <div class="modal-dialog">
            <form action="{{ route('admin.topic.update', $topic->id) }}" method="POST" class="modal-content edit-form">
                @csrf
                @method('PUT')
                <div class="modal-header">
                    <h5 class="modal-title" id="editTopicLabel-{{ $topic->id }}">Edit Topik</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Judul Topik <span class="text-danger">*</span></label>
                        <input type="text" name="title" class="form-control" value="{{ $topic->title }}" required>
                    </div>

                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" name="is_active" id="is_active-{{ $topic->id }}" value="1" {{ $topic->is_active ? 'checked' : '' }}>
                        <label class="form-check-label" for="is_active-{{ $topic->id }}">Aktifkan Topik Ini</label>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary">
                        <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
@endforeach
@endsection

@push('js')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    // Konfirmasi hapus dengan SweetAlert
    function confirmDelete(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: "Data topik akan dihapus permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('delete-form-' + id).submit();
            }
        });
    }

    // Tambahkan spinner loading saat edit disubmit
    document.querySelectorAll('.edit-form').forEach(form => {
        form.addEventListener('submit', function () {
            const btn = this.querySelector('button[type="submit"]');
            const spinner = btn.querySelector('.spinner-border');
            spinner.classList.remove('d-none');
            btn.setAttribute('disabled', 'true');
        });
    });
</script>

@if (session('success'))
<script>
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: {!! json_encode(session('success')) !!},
        showConfirmButton: false,
        timer: 3000
    });
</script>
@endif

@if (session('error'))
<script>
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: {!! json_encode(session('error')) !!},
        showConfirmButton: false,
        timer: 3000
    });
</script>
@endif
@endpush
