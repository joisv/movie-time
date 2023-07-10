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
            'user_id' => 'required',
            'content' => 'required'
        ]);

        $comment = new Comment();
        $comment->post_id = $data['post_id'];
        $comment->user_id = $data['user_id'];
        $comment->content = $data['content'];
        $comment->save();

        return response()->json('berhsil comment');

    }
}
