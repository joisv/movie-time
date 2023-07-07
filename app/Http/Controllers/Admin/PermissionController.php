<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = Permission::orderBy('created_at', 'desc')->get();
       return Inertia::render('Admin/Permissions/Index', [
        'permissions' => $permissions
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate(['name' => 'required|min:3']);
        Permission::create($validate);

        return redirect()->back()->with('message', 'permission created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation = $request->validate([
            'name' => 'string|min:3|unique:permissions,name',
        ]);
          
        $permission = Permission::findOrFail($id);
        $permission->update(['name' => $validation['name']]);
        
        return redirect()->back()->with('success', 'Update successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $permission = Permission::findOrFail($id);
       $permission->delete();

       return redirect()->back()->with('message', 'deleted succesfully');
    }
}
