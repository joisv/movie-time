<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $popularMovie = Post::orderBy('views')->take(10)->get();
        $recently_added = Post::orderBy('created_at', 'desc')->take(10)->get();

        return Inertia::render('Home', [
            'popularMovie' => $popularMovie,
            'recently_added' => $recently_added,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
