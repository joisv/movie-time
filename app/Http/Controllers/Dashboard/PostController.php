<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
   public function index(Request $request) {
      return Inertia::render('Admin/Post/Index', [
         'posts' => Post::orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
         'filters' => $request->only(['search'])
      ]);
    
   }

   public function create() {

      return Inertia::render('Admin/Post/Create');
    
   }

   public function show(string $imdb_id) {
      $data = Post::where('imdb_id', $imdb_id)->with('likedByUsers', 'genres')->first();
      // $comments = Comment::where('slug', $slug)->orderBy('created_at', 'desc')->with('user')->get();

      return Inertia::render('Show', [
         'postdata' => $data,
         // 'comments' => $comments
      ]);
    
   }

   public function likePost(string $id) {
      $post = Post::findOrFail($id);
      $user = auth()->user();

      $isLiked = $post->likedByUsers()->where('user_id', $user->id)->exists();

      if($isLiked){

         $post->decrement('like');
         $post->likedByUsers()->detach($user->id);

      } else{

         $post->increment('like');
         $post->likedByUsers()->attach($user->id);
         
      }


      return response()->json(['berhasil'], 200);
   }
   public function bookmark(string $id) {
      $post = Post::findOrFail($id);
      $user = auth()->user();

      $isBookmarked = $post->bookmarkedByUsers()->where('user_id', $user->id)->exists();

      if($isBookmarked){

         $post->decrement('bookmark');
         $post->bookmarkedByUsers()->detach($user->id);

      } else{

         $post->increment('bookmark');
         $post->bookmarkedByUsers()->attach($user->id);
         
      }


      return response()->json(['berhasil'], 200);
   }

   public function search(Request $request){
     $data = Post::query()->when($request->input('search'),function($query, $search) {
                        $query->where('title','like','%'. $search .'%');
                     })->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

      return response()->json($data);
   }
}
