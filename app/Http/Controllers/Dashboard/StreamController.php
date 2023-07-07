<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StreamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Stream::with('post', 'downloads')->orderBy('created_at', 'desc')->get();
        $posts = Post::all();
        return Inertia::render('Admin/Stream/Index', [
            'datastreams' => $data,
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        foreach ($request->streams as $stream) {
            $newStream = Stream::create([
                'post_id' => $request->post_id,
                'name' => $stream['name'],
                'url' => $stream['url']
            ]);
        
           if(isset($request->downloads)){
            foreach ($request->downloads as $download) {
                $newStream->downloads()->create([
                    'name_download' => $download['name_download'],
                    'url_download' => $download['url_download']
                ]);
            }
           }
        }
        return response()->json(['message' => 'data berhasil di buat']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = Stream::where('id', $id)->first();
        $post = Post::where('id', $data->post_id)
                ->with('streams.downloads')->first();
        $posts = Post::all();
        return Inertia::render('Admin/Stream/Edit', [
            'datastreams' => $post,
            'posts' => $posts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request);
        $request->validate([
            'post_id' => 'required'
        ]);

        $post = Post::find($id);

        $post->streams()->delete();

        // Update atau tambahkan data streams
        foreach ($request['streams'] as $streamData) {
            $newStream = Stream::create([
                'post_id' => $request['post_id'],
                'name' => $streamData['name'],
                'url' => $streamData['url']
            ]);
        
            // Buat ulang downloads untuk stream saat ini
            foreach ($request['downloads'] as $download) {
                $newStream->downloads()->create([
                    'name_download' => $download['name_download'],
                    'url_download' => $download['url_download']
                ]);
            }
        }

        return redirect()->route('streamurl.index')->with('message', 'updated succesfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Stream::findOrfail($id);
        $data->downloads()->delete();
        $data->delete();

        return response()->json('sucees');
    }
}
