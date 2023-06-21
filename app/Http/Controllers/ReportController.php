<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function store(Request $request) {
        try {
            $data = $request->all();
    
            // Validasi data jika diperlukan
            $validatedData = $request->validate([
                'user_id' => 'required',
                'post_id' => 'required',
                'content' => 'required',
            ]);
    
            $report = new Report();
            $report->user_id = $data['user_id'];
            $report->post_id = $data['post_id'];
            $report->content = $data['content'];
            $report->save();
    
            return response()->json(['message' => 'report sent'], 200);
        } catch (\Throwable $th) {
            return response()->json('something went wrong', 500);
        }
    }
}
