<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use App\Models\Post;
use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StreamDownloadController extends Controller
{
    public function index()
    {
        $data = Stream::orderBy('created_at', 'desc')->with('post.downloads')->paginate(20)->withQueryString();
        $posts = Post::all();

        $downloads = Download::orderBy('created_at', 'desc')->with('post')->paginate(20)->withQueryString();
        return Inertia::render('Admin/DownloadAndStream/Index', [
            'datastreams' => $data,
            'posts' => $posts,
            'downloads' => $downloads
        ]);
    }
}
