<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::with('createdBy')->latest()->get();
        return view('topic.index', compact('topics'));
    }

    public function store(Request $request)
    {
        $request->merge([
            'is_active' => $request->has('is_active')
        ]);

        $request->validate([
            'title' => 'required|string|max:255',
            'is_active' => 'required|boolean',
            'created_by' => 'required|exists:users,id',
        ]);

        if ($request->is_active && Topic::where('is_active', true)->count() >= 3) {
            Alert::toast('Maksimal hanya 3 topik yang bisa aktif pada waktu bersamaan', 'error');
            return back();
        }

        try {
            Topic::create([
                'title' => $request->title,
                'is_active' => $request->is_active,
                'created_by' => $request->created_by,
            ]);
            Alert::toast('Topik berhasil ditambahkan', 'success');
            return back();
        } catch (\Exception $e) {
            Alert::toast('Topik gagal ditambahkan', 'error');
            return back();
        }
    }

    public function update(Request $request, $id)
{
    $request->merge([
        'is_active' => $request->has('is_active')
    ]);

    $request->validate([
        'title' => 'required|string|max:255',
        'is_active' => 'required|boolean',
    ]);

    $topic = Topic::findOrFail($id);

    // Hitung topik aktif selain yang sedang diedit
    $activeTopics = Topic::where('is_active', true)->where('id', '!=', $topic->id)->count();

    if ($request->is_active && $activeTopics >= 3) {
        Alert::toast('Maksimal hanya 3 topik yang bisa aktif pada waktu bersamaan', 'error');
        return back()->withInput();
    }

    try {
        $topic->update([
            'title' => $request->title,
            'is_active' => $request->is_active,
        ]);

        Alert::toast('Topik berhasil diperbarui', 'success');
        return back();
    } catch (\Exception $e) {
        Alert::toast('Topik gagal diperbarui', 'error');
        return back()->withInput();
    }
}

public function destroy(Topic $topic)
{
    try {
        $topic->delete();
        Alert::toast('Topik berhasil dihapus', 'success');
        return back();
    } catch (\Exception $e) {
        Alert::toast('Topik gagal dihapus', 'error');
        return back();
    }
}
}
