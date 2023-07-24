<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Genre;
use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
   public function index(Request $request)
   {


      return Inertia::render('Admin/Post/Index', [
         'posts' => Post::orderBy('created_at', 'desc')->paginate(20),
      ]);
   }

   public function create()
   {

      $genres = Genre::all();
      return Inertia::render('Admin/Post/Create', [
         'genres' => $genres

      ]);
   }

   public function store(Request $request)
   {
      $validatedData = $request->validate([
         'adult' => 'boolean',
         'backdrop_path' => 'nullable|string',
         'tmdb_id' => 'nullable|numeric',
         'imdb_id' => 'nullable|string',
         'original_language' => 'nullable|string',
         'original_title' => 'nullable|string',
         'overview' => 'nullable|string',
         'popularity' => 'nullable|numeric',
         'poster_path' => 'nullable|string',
         'release_date' => 'nullable|string',
         'revenue' => 'nullable|numeric',
         'runtime' => 'nullable|numeric',
         'status' => 'nullable|string',
         'tagline' => 'nullable|string',
         'title' => 'required|string',
         'video' => 'boolean',
         'vote_average' => 'nullable|numeric|between:0,999.999',
         'vote_count' => 'nullable|numeric',
         'poster_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
         'backdrop_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
         'genres' => 'required',
      ]);

      if ($request->hasFile('poster_path')) {
         $posterPath = $request->file('poster_path')->store('posters');
         $validatedData['poster_path'] = $posterPath;
      }

      if ($request->hasFile('backdrop_path')) {
         $backdropPath = $request->file('backdrop_path')->store('backdrops');
         $validatedData['backdrop_path'] = $backdropPath;
      }

      $post = Post::create($validatedData);
      $post->setSlugAttribute($validatedData['title']);
      $post->save();
      // Simpan genre-genre terkait
      $post->genres()->attach($request->genres);

      return redirect()->route('post.index')->with('success', 'Created successfully');
   }

   public function show(string $slug)
   {
      $data = Post::where('slug', $slug)->with('likedByUsers', 'genres', 'bookmarkedByUsers')->first();
      
      // $comments = Comment::where('slug', $slug)->orderBy('created_at', 'desc')->with('user')->get();

      return Inertia::render('Show', [
         'postdata' => $data,
      ]);
   }

   public function edit(string $id)
   {
      $post = Post::where('id', $id)->with('genres')->first();
      $genres = Genre::all();

      return Inertia::render('Admin/Post/Edit', [
         'postdata' => $post,
         'genres' => $genres
      ]);
   }

   public function update(Request $request, string $id)
   {
      $validatedData = $request->validate([
         'adult' => 'boolean',
         'backdrop_path' => 'nullable|string',
         'tmdb_id' => 'nullable|numeric',
         'imdb_id' => 'nullable|string',
         'original_language' => 'nullable|string',
         'original_title' => 'nullable|string',
         'overview' => 'nullable|string',
         'popularity' => 'nullable|numeric',
         'release_date' => 'nullable|string',
         'revenue' => 'nullable|numeric',
         'runtime' => 'nullable|numeric',
         'status' => 'nullable|string',
         'tagline' => 'nullable|string',
         'title' => 'required|string',
         'video' => 'boolean',
         'vote_average' => 'nullable|numeric|between:0,999.999',
         'vote_count' => 'nullable|numeric',
         'poster_path' => ($request->hasFile('poster_path')) ? 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' : '',
         'backdrop_path' => ($request->hasFile('backdrop_path')) ? 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' : '',
         'genres' => 'required',
      ]);
      $post = Post::findOrFail($id);
      if ($request->hasFile('poster_path')) {
         if ($post->poster_path !== null) Storage::delete($post->poster_path);
         $posterPath = $request->file('poster_path')->store('posters');
         $validatedData['poster_path'] = $posterPath;
      }

      if ($request->hasFile('backdrop_path')) {
         if ($post->backdrop_path !== null)  Storage::delete($post->backdrop_path);
         $backdropPath = $request->file('backdrop_path')->store('backdrops');
         $validatedData['backdrop_path'] = $backdropPath;
      }
      try {

         $post->update($validatedData);
         $post->setSlugAttribute($validatedData['title']);
         $post->save();
         // Simpan genre
         $post->genres()->sync($request->genres);

         return redirect()->route('post.index')->with('message', 'Post updated');
      } catch (ModelNotFoundException $e) {
         return redirect()->route('post.index')->with('error', 'Post not found');
      }
   }

   public function destroy(string $id)
   {
      $data = Post::findOrFail($id);
      if ($data->poster_path) {
         Storage::delete($data->poster_path);
      }
      if ($data->backdrop_path) {
         Storage::delete($data->backdrop_path);
      }
      $data->delete();

      return redirect()->back()->with('message', 'post deleted successfully');
   }

   public function likePost(string $id)
   {
      $post = Post::findOrFail($id);
      $user = auth()->user();

      $isLiked = $post->likedByUsers()->where('user_id', $user->id)->exists();

      if ($isLiked) {

         $post->decrement('like');
         $post->likedByUsers()->detach($user->id);
      } else {

         $post->increment('like');
         $post->likedByUsers()->attach($user->id);
      }


      return response()->json(['berhasil'], 200);
   }

   public function bookmark(string $id)
   {
      $post = Post::findOrFail($id);
      $user = auth()->user();

      $isBookmarked = $post->bookmarkedByUsers()->where('user_id', $user->id)->exists();

      if ($isBookmarked) {

         $post->decrement('bookmark');
         $post->bookmarkedByUsers()->detach($user->id);
      } else {

         $post->increment('bookmark');
         $post->bookmarkedByUsers()->attach($user->id);
      }


      return response()->json(['berhasil'], 200);
   }

   public function search(Request $request)
   {
      $data = Post::query()->when($request->input('search'), function ($query, $search) {
         $query->where('title', 'like', '%' . $search . '%');
      })->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

      return response()->json($data);
   }

   public function bulkDelete(Request $request)
   {

      Post::whereIn('id', $request->postId)->delete();
      return redirect()->back()->with('message', 'bulk delete successfully');
   }
}
