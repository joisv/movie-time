<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminRequestController extends Controller
{
    public function index() {

        $data = ModelsRequest::with('user')->orderBy('created_at', 'desc')->get();
        DB::table('requests')->where('is_new', true)->update(['is_new' => false]);
        
        return Inertia::render('Admin/Request/Index', [
            'datas' => $data
        ]);
    }

    public function update(Request $request, string $id){

        $data = ModelsRequest::findOrFail($id);
        $data->status = $request->status;
        $data->save();

        $notif = new Notification();
        $notif->user_id = $data->user_id;
        $notif->is_read = false;
        $notif->request_id = $id;
        if ($request->status === 'completed') {
            $notif->message = "Your request has been completed successfully.";
        } elseif ($request->status === 'cancelled') {
            $notif->message = "Your request has been cancelled.";
        } elseif ($request->status === 'pending') {
            $notif->message = "Your request is pending for approval.";
        }
        $notif->save();

        return redirect()->route('adminrequest.index')->with('message', 'request updated');
    }

  
}
