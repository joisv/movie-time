<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DownloadController extends Controller
{
    public function edit(string $id)
    {

        $downloads  = Download::where('id', $id)->with('post')->get();
        return Inertia::render('Admin/Downloads/Edit', [
            'downloads' => $downloads
        ]);
    }

    public function update(Request $request, string $id)
    {
        // dd($id);
        $validatedData = $request->validate([
            'downloads.*.url_download' => 'sometimes|required|url',
            'downloads.*.name_download' => 'sometimes|required|string',
        ]);

        $post = Post::findOrFail($id);

        // Hapus semua downloads yang terkait dengan post
        $post->downloads()->delete();

        // Buat ulang downloads yang baru
        if (isset($validatedData['downloads'])) {
            $downloadsData = $validatedData['downloads'];
            $downloads = [];

            foreach ($downloadsData as $downloadData) {
                $download = new Download($downloadData);
                $downloads[] = $download;
            }

            $post->downloads()->saveMany($downloads);
        }

        return redirect()->route('streamdownload')->with('message', 'download updated successfully');
    }
    public function destroy(string $id)
    {
        $data = Download::findOrfail($id);
        $data->delete();

        return response()->json('sucees');
    }
    
    public function search(Request $request)
    {
        $data = Download::query()
        ->when($request->input('search'), function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name_download', 'like', '%' . $search . '%')
                    ->orWhereHas('post', function ($query) use ($search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    });
            });
        })
        ->with('post')
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

        return response()->json($data);
    }
}
