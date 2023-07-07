<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\StreamController;
use App\Http\Controllers\GenerateMovieController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserHistoryController;
use App\Models\Genre;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Stream;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // admin
    Route::delete('/post-delete/{id}', [PostController::class, 'destroy'])->name('api.post.destroy');

    Route::post('/history/store', [UserHistoryController::class, 'store'])->name('history.store');

    Route::post('/genereate-movie/{id}', [GenerateMovieController::class, 'generate'])->name('generate');
    Route::get('/generate-genre', [GenerateMovieController::class, 'generateMovieGenre'])->name('generate.genre');

    Route::get('/search', [PostController::class, 'search'])->name('search');

    Route::get('/get-post', function () {

        $data = Post::all();
        return response()->json($data);
    })->name('getpost');


    Route::post('/stream/store', [StreamController::class, 'store'])->name('stream.store');
    Route::delete('/stream/destroy/{id}', [StreamController::class, 'destroy'])->name('stream.destroy');

    Route::get('/permission/{id}', function (string $id) {
        $roles = Role::all();
        $permission = Permission::where('id', $id)->with('roles')->first();
        return response()->json([
            'permissions' => $permission,
            'roles' => $roles
        ]);
    })->name('api.permission.show');

    Route::get('/roles/{id}', function (string $id) {
        $permissions =  Permission::all();
        $role = Role::where('id', $id)->with('permissions')->first();
        return response()->json([
            'role' => $role,
            'permissions' => $permissions
        ]);
    })->name('api.roles.show');
    
    Route::get('/user/{id}', function (string $id) {
        $roles =  Role::all();
        $user = User::where('id', $id)->with('roles')->first();
        return response()->json([
            'user' => $user,
            'roles' => $roles
        ]);
    })->name('api.user.show');
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/like-post/{id}', [PostController::class, 'likePost'])->name('post.postlike');
    Route::post('/bookmark-post/{id}', [PostController::class, 'bookmark'])->name('post.bookmark');

    Route::post('/report-post', [ReportController::class, 'store'])->name('report.store');

    Route::get('/notification', function () {
        $user = auth()->user();
        $data = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        return response()->json(['notifications' => $data], 200);
    })->name('notification');

    Route::put('/notification/update', function (Request $request) {

        try {
            $user = auth()->user();

            if ($user->id == $request->user_id) {

                $data = Notification::findOrfail($request->id);
                $data->is_read = true;
                $data->save();

                return response()->json(['message' => 'berhasil'], 200);
            }
        } catch (\Throwable $th) {
            return response()->json('something went wrong');
        }
    })->name('notification.update');
});
