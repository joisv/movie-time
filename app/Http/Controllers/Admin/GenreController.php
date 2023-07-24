<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenreController extends Controller
{
    public function index() {
        $genres = Genre::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Genres/Index', [
            'genres' => $genres
        ]);
    }

    public function store(Request $request){
        $validation = $request->validate([
            'name' => 'unique:genres,name|required|min:3'
        ]);

        Genre::create($validation);

        return redirect()->back()->with('message', 'create successfully');
    }

    public function update(Request $request, string $id){
        $validation = $request->validate([
            'name' => 'unique:genres,name|required|min:3'
        ]);

        $genre = Genre::findOrFail($id);
        $genre->update($validation);

        return redirect()->back()->with('message', 'updated successfully');
    }

    public function destroy(string $id){

        $genre = Genre::findOrFail($id);
        $genre->delete();

        return redirect()->back()->with('message', 'deleted successfully');
        
    }

    public function search(Request $request)
    {
       $data = Genre::query()->when($request->input('search'), function ($query, $search) {
          $query->where('name', 'like', '%' . $search . '%');
       })->orderBy('created_at', 'desc')->paginate(10)->withQueryString();
 
       return response()->json($data);
    }
}
