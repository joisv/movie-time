<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecomendationController extends Controller
{
    public function getRecomendation()
    {
        $posts = Post::withCount('comments')
            ->orderBy('views', 'desc')
            ->orderBy('like', 'desc')
            ->orderBy('bookmark', 'desc')
            ->take(10)
            ->get();

        return response()->json($posts);
    }
}
