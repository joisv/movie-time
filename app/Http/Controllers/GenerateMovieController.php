<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Http;

class GenerateMovieController extends Controller
{
    private $http_get;

    public function __construct(){
        $url = \config('access_token.url');
        $this->http_get = Http::withHeaders([
            'Authorization' => 'Bearer ' . $url,
            'Accept' => 'application/json',
        ]);
    }

    public function generate(string $id) {
        $dataExist = Post::where('tmdb_id', $id)->first();

        if(empty($dataExist)){
            try {
                $response = $this->http_get->get('https://api.themoviedb.org/3/movie/'.$id.'?language=en-US');
    
                if ($response->successful()) {
                    $data = $response->json();
    
                    if (is_array($data)) {
                        // Simpan data ke model Post
                        $post = new Post();
                        $post->adult = $data['adult'];
                        $post->backdrop_path = $data['backdrop_path'];
                        $post->tmdb_id = $data['id'];
                        $post->imdb_id = $data['imdb_id'];
                        $post->original_language = $data['original_language'];
                        $post->original_title = $data['original_title'];
                        $post->overview = $data['overview'];
                        $post->popularity = $data['popularity'];
                        $post->poster_path = $data['poster_path'];
                        $post->release_date = $data['release_date'];
                        $post->revenue = $data['revenue'];
                        $post->runtime = $data['runtime'];
                        $post->status = $data['status'];
                        $post->tagline = $data['tagline']; 
                        $post->title = $data['title'];
                        $post->video = $data['video'];
                        $post->vote_average = $data['vote_average'];
                        $post->vote_count = $data['vote_count'];
                        $post->save();
        
                        return response('Generate created succesfully');
                    } else {
                        // Tangani jika $data bukan array
                        return response('Error: Invalid data format', 500);
                    }
                } else {
                    // Tangani respons jika tidak berhasil (kode status bukan 2xx)
                    return response('Error: ' . $response->status(), $response->status());
                }
            } catch (\Exception $e) {
                // Tangani jika terjadi kesalahan dalam permintaan
                return response('Error: ' . $e->getMessage(), 500);
            }
        } else {
            return response('Error: Data already exist', 500);
        }
    }

    public function generateMovieGenre(){

        $isdataExist = Genre::exists();
        
        if(!$isdataExist){

            $response = $this->http_get->get('https://api.themoviedb.org/3/genre/movie/list?language=en');
            if($response->successful()){

                $data = $response->json();
                
                if (isset($data['genres']) && is_array($data['genres'])) {
                    foreach ($data['genres'] as $item) {
                        $genre = new Genre();
                        $genre->name = $item['name'];
                        $genre->tmdb_id = $item['id'];
                        $genre->save();
                    }
        
                    return response('Genre data created successfully');
                } else {
                    // Tangani jika $data['results'] bukan array atau tidak ada
                    return response('Error: Invalid data format', 500);
                }
            } else {
                // Tangani respons jika tidak berhasil (kode status bukan 2xx)
                return response('Error: ' . $response->status(), $response->status());
            }
        } else {
            return response('Error: Data already exist', 500);
        }
    }
}
