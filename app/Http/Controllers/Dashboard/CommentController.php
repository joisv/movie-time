<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request){
        
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
}
