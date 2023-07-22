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
        $randomGenreName = Genre::where('name', 'comedy')->first();
        $postsByGenres = $randomGenreName->posts;
        $postByVoteAverage = Post::orderBy('vote_average', 'desc')->get();
        $topLike = Post::orderBy('like', 'desc')->get();
        $user = auth()->user();
        $userHistory = History::where('user_id', $user->id)->with('post')->orderBy('timestamp', 'desc')->get();
        $movieThisYear = Post::whereRaw('YEAR(release_date) = ?', [$currentYear])->get();
        
        return Inertia::render('Explore', [
            'postByGenres' => $postsByGenres,
            'genreName' => $randomGenreName,
            'postByVoteAverage' => $postByVoteAverage,
            'userHistory' => $userHistory,
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
