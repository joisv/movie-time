<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function likedByUsers(){
        return $this->belongsToMany(User::class, 'post_likes', 'post_id', 'user_id');
    }
    
    public function bookmarkedByUsers(){
        return $this->belongsToMany(User::class, 'post_bookmarks', 'post_id', 'user_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function histories()
    {
        return $this->hasMany(History::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'post_genre', 'post_id', 'genre_id');
    }
}
