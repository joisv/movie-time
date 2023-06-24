<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserNotificationsController extends Controller
{
    public function index(){

        $user = auth()->user();

        $data = Notification::where('user_id', $user->id)->orderBy('created_at', 'desc')->with('user', 'request')->get();
        
        return Inertia::render('Users/Notifications',[
            'datas' => $data
        ]);
    }
}
