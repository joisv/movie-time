<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Download;
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
        $data = Stream::orderBy('created_at', 'desc')->with('post.downloads')->paginate(20)->withQueryString();
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
        $validatedData = $request->validate([
            'streams.*.name' => 'sometimes|required|string',
            'streams.*.url' => 'sometimes|required|url',
            'downloads.*.url_download' => 'sometimes|required|url',
            'downloads.*.name_download' => 'sometimes|required|string',
            'post_id' => 'required|exists:posts,id'
        ]);
    
        $post = Post::findOrFail($validatedData['post_id']);
    
        if (isset($validatedData['streams'])) {
            $streamsData = $validatedData['streams'];
            $streams = [];
    
            foreach ($streamsData as $streamData) {
                if (!empty($streamData['name']) && !empty($streamData['url'])) {
                    $stream = new Stream($streamData);
                    $streams[] = $stream;
                }
            }
    
            $post->streams()->saveMany($streams);
        }
    
        if (isset($validatedData['downloads'])) {
            $downloadsData = $validatedData['downloads'];
            $downloads = [];
    
            foreach ($downloadsData as $downloadData) {
                if (!empty($downloadData['url_download']) && !empty($downloadData['name_download'])) {
                    $download = new Download($downloadData);
                    $downloads[] = $download;
                }
            }
    
            $post->downloads()->saveMany($downloads);
        }
    
        return redirect()->back()->with('message', 'created successfully');
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
        $stream = Stream::where('id', $id)->with('post')->get();
        return Inertia::render('Admin/Stream/Edit', [
            'streams' => $stream,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'streams.*.name' => 'sometimes|required|string',
            'streams.*.url' => 'sometimes|required|url',
        ]);
    
        $post = Post::findOrFail($id);
    
        // Hapus semua streams yang terkait dengan post
        $post->streams()->delete();
    
        // Buat ulang streams yang baru
        if (isset($validatedData['streams'])) {
            $streamsData = $validatedData['streams'];
            $streams = [];
    
            foreach ($streamsData as $streamData) {
                $stream = new Stream($streamData);
                $streams[] = $stream;
            }
    
            $post->streams()->saveMany($streams);
        }

        return redirect()->route('streamdownload')->with('message', 'updated stream successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Stream::findOrfail($id);
        $data->delete();

        return response()->json('sucees');
    }

    public function search(Request $request)
    {
        $data = Stream::query()
        ->when($request->input('search'), function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
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
