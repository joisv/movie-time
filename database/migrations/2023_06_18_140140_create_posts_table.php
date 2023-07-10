<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('views')->default(0);
            $table->string('slug')->unique()->nullable();
            $table->boolean('adult')->default(false);
            $table->string('backdrop_path')->nullable();
            $table->bigInteger('tmdb_id')->nullable();
            $table->string('imdb_id')->nullable();
            $table->string('original_language')->nullable();
            $table->string('original_title')->nullable();
            $table->longText('overview')->nullable();
            $table->bigInteger('popularity')->nullable();
            $table->string('poster_path')->nullable();
            $table->string('release_date')->nullable();
            $table->bigInteger('revenue')->nullable();
            $table->bigInteger('runtime')->nullable();
            $table->string('status')->nullable();
            $table->string('tagline')->nullable();
            $table->string('title')->nullable();
            $table->boolean('video')->default(false);
            $table->decimal('vote_average', 5, 3)->nullable();
            $table->bigInteger('vote_count')->nullable();
            $table->integer('like')->default(0);
            $table->integer('bookmark')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
