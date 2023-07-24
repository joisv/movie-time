<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRequestController extends Controller
{
    public function index() {
        $user = auth()->user();
        $data = ModelsRequest::where('user_id', $user->id)->with('user')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Users/Request', [
            'datas' => $data
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'content' => 'required',
            'user_id' => 'required',
            'status' => 'required'
        ]);

        $req = new ModelsRequest();
        $req->content = $data['content'];
        $req->user_id = $data['user_id'];
        $req->status = $data['status'];
        $req->is_new = true;
        $req->save();

        return redirect()->route('request.index')->with('message', 'request sent');
    }

    public function destroy(Request $request, String $id){

        $req = ModelsRequest::findOrFail($id);
        $req->delete();
        
        return redirect()->back()->with('message', 'request successfully deleted');
    }
}
