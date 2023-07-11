<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserNotificationsController extends Controller
{
    public function index()
    {

        $user = auth()->user();

        $data = Notification::where('user_id', $user->id)->orderBy('created_at', 'desc')->with('user', 'request')->get();

        return Inertia::render('Users/Notifications', [
            'datas' => $data
        ]);
    }

    public function update(Request $request)
    {
        // return response()->json($request);
        try {
            if (auth()->check()) {
                $notification = Notification::where('request_id', $request->id)->first();
                $notification->update(['is_read' => true]);
    
                return response()->json('updated successfully');
            } else {
                return response()->json('Not authenticated');
            }
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
}
