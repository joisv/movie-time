<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Dashboard\AdminRequestController;
use App\Http\Controllers\Dashboard\CommentController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\StreamController;
use App\Http\Controllers\Dashboard\UserNotificationsController;
use App\Http\Controllers\Dashboard\UserRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserHistoryController;
use App\Http\Controllers\UserProfileController;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// guest
Route::get('/', function () {

    $datas = Post::all();
    
    return Inertia::render('Home', [
        'datas' => $datas,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/post/{id}', [PostController::class, 'show'])->name('post.show');
Route::get('/stream/{id}', function (string $id) {
    $data = Post::where('id', $id)->with('likedByUsers', 'genres')->first();
    $comments = Comment::where('post_id', $data->id)->orderBy('created_at', 'desc')->with('user')->get();
    return Inertia::render('Stream', [
        'postdata' => $data,
        'comments' => $comments
    ]);
})->name('stream');

// admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    // admin dashboard
    Route::get('/', function() {
        return Inertia::render('Admin/Dashboard');
    })->name('admin');
    // post
    Route::get('/post', [PostController::class, 'index'])->name('post.index');
    Route::get('/post-edit/{id}', [PostController::class, 'edit'])->name('post.edit');
    Route::put('/post-update/{id}', [PostController::class, 'update'])->name('post.update');
    Route::get('/post-create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post-store', [PostController::class, 'store'])->name('post.store');
    Route::delete('/post-bulkdelete', [PostController::class, 'bulkDelete'])->name('post.bulkdelete');

    // request
    Route::get('/request/all', [AdminRequestController::class, 'index'])->name('adminrequest.index');
    Route::patch('/request/store', [AdminRequestController::class, 'store'])->name('adminrequest.store');
    Route::patch('/request/update/{id}', [AdminRequestController::class, 'update'])->name('adminrequest.update');
    // episodes
    Route::resource('/episodes', StreamController::class)->names('streamurl');
    // permissions
    Route::resource('/permissions', PermissionController::class)->names('permissions');
    // roles
    Route::resource('/roles', RoleController::class)->names('roles');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'givePermission'])->name('givepermission');
    Route::delete('/roles/{role}/permissions/{permission}', [RoleController::class, 'revokePermission'])->name('roles.permission.revoke');
});


Route::middleware('auth')->group(function () {
    Route::get('/request', [UserRequestController::class, 'index'])->name('request.index');
    Route::post('/request/store', [UserRequestController::class, 'store'])->name('request.store');

    Route::get('/notifications', [UserNotificationsController::class, 'index'])->name('usernotifications.index');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user-profile', [UserProfileController::class, 'edit'])->name('userprofile.edit');

    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');

    Route::get('/history', [UserHistoryController::class, 'index'])->name('history.index');

    Route::get('/bookmark', function() {
        $data = auth()->user()->bookmarkedPosts;

        return Inertia::render('Users/Bookmark', [
            'bookmarks' => $data
        ]);
    })->name('bookmark');

    Route::get('/like', function() {
        $data = auth()->user()->likedPosts;

        return Inertia::render('Users/Like', [
            'likes' => $data
        ]);
    })->name('like');
    
});
 // Route::get('/dashboard', function () {
    //     return Inertia::render('Users/Dashboard');
    // })->name('dashboard');

require __DIR__.'/auth.php';
