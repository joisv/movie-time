<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\History;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index()
    {
        $currentYear = Carbon::now()->year;
        $randomGenreName = Genre::inRandomOrder()->first();
        $postsByGenres = $randomGenreName->posts->take(10);
        $postByVoteAverage = Post::orderBy('vote_average', 'desc')->take(10)->get();
        $topLike = Post::orderBy('like', 'desc')->take(10)->get();
        $user = auth()->user();
        if(auth()->check()){
            $userHistory = History::where('user_id', $user->id)->with('post')->orderBy('timestamp', 'desc')->take(10)->get();
        }
        $movieThisYear = Post::whereRaw('YEAR(release_date) = ?', [$currentYear])->take(10)->get();
        
        return Inertia::render('Explore', [
            'postByGenres' => $postsByGenres,
            'genreName' => $randomGenreName,
            'postByVoteAverage' => $postByVoteAverage,
            'userHistory' => auth()->check() ? $userHistory : null,
            'movieThisYear' => $movieThisYear,
            'topLike' => $topLike
        ]);
    }

    public function getGenres()
    {
        $genres = Genre::all();

        return response()->json($genres);
    }
}
