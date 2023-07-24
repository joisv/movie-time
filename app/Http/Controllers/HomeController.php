<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $recomendationMovies = Post::withCount('comments')
            ->orderBy('views', 'desc')
            ->orderBy('like', 'desc')
            ->orderBy('bookmark', 'desc')
            ->take(10)
            ->get();
        $popularMovie = Post::orderBy('views')->take(10)->get();
        $recently_added = Post::orderBy('created_at', 'desc')->take(10)->get();

        return Inertia::render('Home', [
            'recomendationMovies' => $recomendationMovies,
            'popularMovie' => $popularMovie,
            'recently_added' => $recently_added,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function getBanner()
    {

        $banners = Banner::all();

        return response()->json($banners);
    }

    public function searchMovie(Request $request)
    {
        $data = Post::query()->when($request->input('search'), function ($query, $search) {
            $query->where('title', 'like', '%' . $search . '%');
        })->orderBy('created_at', 'desc')->get();

        return response()->json($data);
    }
}
