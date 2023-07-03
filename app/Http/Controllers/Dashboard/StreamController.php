<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
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
        $data = Stream::with('post', 'downloads')->get();
        return Inertia::render('Admin/Stream/Index', [
            'datastreams' => $data
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
        $data = $request->validate([
            'post_id' => 'required',
            'streams' => 'array',
            'streams.*' => 'string|required',
            'downloads' => 'array',
            'downloads.*' => 'string|required'
        ]);


        foreach ($request->streams as $stream) {
            $newStream = Stream::create([
                'post_id' => $request->post_id,
                'name' => $stream['name'],
                'url' => $stream['url']
            ]);
        
            foreach ($request->downloads as $download) {
                $newStream->downloads()->create([
                    'name_download' => $download['name_download'],
                    'url_download' => $download['url_download']
                ]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
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
