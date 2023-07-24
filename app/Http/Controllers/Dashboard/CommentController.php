<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    private $increment = 2;

    public function store(Request $request)
    {

        $data = $request->validate([
            'post_id' => 'required',
            'content' => 'required|max:500'
        ]);

        $comment = new Comment();
        $comment->post_id = $data['post_id'];
        $comment->user_id = auth()->user()->id;
        $comment->content = $data['content'];
        $comment->save();

        return response()->json('berhsil comment');
    }

    public function postComment(string $id)
    {
        $comments = Comment::where('post_id', $id)->orderBy('created_at', 'desc')->with('user')->paginate();
        $comments_count = Comment::where('post_id', $id)->count();

        return response()->json([
            'comments' => $comments,
            'count' => $comments_count,
        ]);
    }

   
}
