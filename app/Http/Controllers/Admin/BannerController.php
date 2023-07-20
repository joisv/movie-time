<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Post;
use App\Rules\ValidRedirectTo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::all();
        $base_url_banner = \config('app.url');
        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
            'base_url' => $base_url_banner
        ]);
    }

    public function store(Request $request)
    {

        $validation = $request->validate([
            'name' => 'required|min:3|unique:banners,name',
            'redirect_to' =>  [
                'nullable',
                'string',
                new ValidRedirectTo(),
            ],
            'banner_img' => 'required|image|max:2048'
        ]);

        $banner_path = $request->hasFile('banner_img') ? $request->file('banner_img')->store('banner_imgs') : $validation['banner_img'];

        Banner::create([
            'name' => $validation['name'],
            'redirect_to' => $validation['redirect_to'],
            'banner_img' => $banner_path ?? null
        ]);

        return redirect()->back()->with('message', 'created successfully');
    }

    public function edit(string $id)
    {
        $banner = Banner::where('id', $id)->first();
        return response()->json([
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validation = $request->validate([
            'name' => 'required|min:3',
            'redirect_to' =>  [
                'nullable',
                'string',
                new ValidRedirectTo(),
            ],
            'banner_img' => $request->file('banner_img') ? 'nullable|image|max:2048' : 'string|nullable'
        ]);

        $banner = Banner::findOrFail($id);

        $banner_path = $banner->banner_img;

        if ($request->hasFile('banner_img')) {
            if ($banner_path) {
                Storage::delete($banner_path);
            }
            $banner_path = $request->file('banner_img')->store('banner_imgs');
        }

        $banner->update([
            'name' => $validation['name'],
            'redirect_to' => $validation['redirect_to'],
            'banner_img' => $banner_path ?? null
        ]);

        return redirect()->back()->with('message', 'updated successfully');
    }

    public function destroy(String $id)
    {

        $banner = Banner::findOrFail($id);
        $banner->delete();

        return redirect()->back()->with('message', 'deleted successfully');
    }

    public function visit(Request $request)
    {
        $slug = $request->query('slug');
        $isSlugExist = Post::where('slug', $slug)->exists();

        return response()->json($isSlugExist);
    }
}
