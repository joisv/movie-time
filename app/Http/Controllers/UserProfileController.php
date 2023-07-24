<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Users/Profile/Edit');
    }

    public function update(Request $request)
    {
        $validation = $request->validate([
            'name' => 'string|min:5|required',
            'email' => 'email|required',
            'avatar' => ($request->hasFile('avatar')) ? 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' : '',
        ]);

        if ($request->hasFile('avatar')) {
            // dd($request->hasFile('avatar'));
            $avatar = $request->file('avatar')->store('avatar');
            $validation['avatar'] = $avatar;
        }

        $user = User::findOrFail(auth()->user()->id);
        $user->name = $validation['name'];
        $user->email = $validation['email'];
        $user->avatar = $validation['avatar'];
        $user->save();


        return Redirect::back();
    }
}
