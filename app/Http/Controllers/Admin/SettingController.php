<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Settings/Edit');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255|required',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $setting = Settings::first();

        if ($setting) {
            // Hapus file icon lama jika ada
            if ($request->hasFile('icon') && $setting->icon) {
                Storage::delete($setting->icon);
            }

            // Hapus file logo lama jika ada
            if ($request->hasFile('logo') && $setting->logo) {
                Storage::delete($setting->logo);
            }
        }

        // Simpan file icon baru jika ada dalam request
        $iconPath = $request->hasFile('icon') ? $request->file('icon')->store('icons') : $setting->icon;

        // Simpan file logo baru jika ada dalam request
        $logoPath = $request->hasFile('logo') ? $request->file('logo')->store('logos') : $setting->logo;

        // Simpan data ke dalam database
        if ($setting) {
            $setting->update([
                'name' => $request->name,
                'icon' => $iconPath ?? null,
                'logo' => $logoPath ?? null,
            ]);
        } else {
            Settings::create([
                'name' => $request->name,
                'icon' => $iconPath ?? null,
                'logo' => $logoPath ?? null,
            ]);
        }


        return redirect()->back()->with('message', 'created successfully');
    }
}
