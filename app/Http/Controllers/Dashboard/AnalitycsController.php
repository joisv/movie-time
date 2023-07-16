<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalitycsController extends Controller
{
    public function index()
    {
        $postByViews = Post::orderBy('views', 'desc')->take(5)->get();
        return Inertia::render('Admin/Dashboard/Dashboard', [
            'postByViews' => $postByViews
        ]);
    }

    public function popular()
    {
    }
}
