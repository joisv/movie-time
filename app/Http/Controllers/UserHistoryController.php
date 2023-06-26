<?php

namespace App\Http\Controllers;

use App\Models\History;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserHistoryController extends Controller
{
    public function index() {
        $user = auth()->user();
        $data = History::where('user_id', $user->id)->with('post')->orderBy('timestamp', 'desc')->get();

        return Inertia::render('Users/History', [
            'histories' => $data
        ]);
    }
    
    public function store(Request $request) {
        try {
    
            $data = History::where('post_id', $request->post_id)
            ->where('user_id', $request->user_id)
            ->get();

            if ($data->isEmpty()) {
                // Jika tidak ada data history dengan post_id yang sama, tambahkan history baru
                $history = new History();
                $history->post_id = $request->post_id;
                $history->user_id = $request->user_id;
                $history->timestamp = Carbon::now();
                $history->save();
            } else {
                // Jika data history dengan post_id yang sama ditemukan, perbarui timestamp
                $history = $data->first();
                $history->timestamp = Carbon::now();
                $history->save();
            }

            return response()->json(['message' => 'history created succesfully'],200);
        } catch (\Throwable $th) {
            return response()->json('something went wrong',500);
        }
    }
}
