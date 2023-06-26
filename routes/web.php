<?php

use App\Http\Controllers\Dashboard\AdminRequestController;
use App\Http\Controllers\Dashboard\CommentController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\UserNotificationsController;
use App\Http\Controllers\Dashboard\UserRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserHistoryController;
use App\Models\Post;
use App\Models\User;
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

// admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', function() {
        return Inertia::render('Admin/Dashboard');
    })->name('admin');

    Route::get('/post', [PostController::class, 'index'])->name('post');
    Route::get('/post-create', [PostController::class, 'create'])->name('post.create');
    
    Route::get('/request/all', [AdminRequestController::class, 'index'])->name('adminrequest.index');
    Route::patch('/request/store', [AdminRequestController::class, 'store'])->name('adminrequest.store');
    Route::patch('/request/update/{id}', [AdminRequestController::class, 'update'])->name('adminrequest.update');
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Users/Dashboard');
    })->name('dashboard');

    Route::get('/request', [UserRequestController::class, 'index'])->name('request.index');
    Route::post('/request/store', [UserRequestController::class, 'store'])->name('request.store');

    Route::get('/notifications', [UserNotificationsController::class, 'index'])->name('usernotifications.index');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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

require __DIR__.'/auth.php';
