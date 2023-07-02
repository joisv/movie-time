<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Download extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function stream(){
        return $this->belongsTo(Stream::class);
    }
}
