<?php

use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StreamDownloadController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Dashboard\AdminRequestController;
use App\Http\Controllers\Dashboard\AnalitycsController;
use App\Http\Controllers\Dashboard\CommentController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\StreamController;
use App\Http\Controllers\Dashboard\UserNotificationsController;
use App\Http\Controllers\Dashboard\UserRequestController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecomendationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserHistoryController;
use App\Http\Controllers\UserProfileController;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Stream;
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
// admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    // admin dashboard
    Route::get('/', [AnalitycsController::class, 'index'])->name('admin');
    // post
    Route::post('/stream/store', [StreamController::class, 'store'])->name('stream.store');
    Route::get('/stream/edit/{id}', [StreamController::class, 'edit'])->name('stream.edit');
    Route::put('/stream/update/{id}', [StreamController::class, 'update'])->name('stream.update');
    Route::delete('/stream/destroy/{id}', [StreamController::class, 'destroy'])->name('stream.destroy');

    Route::get('/post', [PostController::class, 'index'])->name('post.index');
    Route::get('/post-edit/{id}', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/post-update/{id}', [PostController::class, 'update'])->name('post.update');
    Route::get('/post-create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post-store', [PostController::class, 'store'])->name('post.store');
    Route::delete('/post-bulkdelete', [PostController::class, 'bulkDelete'])->name('post.bulkdelete');

    Route::get('/genres', [GenreController::class, 'index'])->name('genres.index');
    Route::post('/genres/store', [GenreController::class, 'store'])->name('genres.store');
    Route::put('/genres/update/{id}', [GenreController::class, 'update'])->name('genres.update');
    Route::delete('/genres/destroy/{id}', [GenreController::class, 'destroy'])->name('genres.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // request
    Route::get('/request/all', [AdminRequestController::class, 'index'])->name('adminrequest.index');
    Route::patch('/request/store', [AdminRequestController::class, 'store'])->name('adminrequest.store');
    Route::patch('/request/update/{id}', [AdminRequestController::class, 'update'])->name('adminrequest.update');
    Route::delete('/request/destroy/{id}', [AdminRequestController::class, 'destroy'])->name('adminrequest.destroy');
    // permissions
    Route::resource('/permissions', PermissionController::class)->names('permissions');
    Route::post('/permissions/{permission}/roles', [PermissionController::class, 'assignRole'])->name('permissions.role');
    Route::delete('/permissions/{permission}/roles/{role}', [PermissionController::class, 'removeRole'])->name('permissions.role.remove');
    // roles
    Route::resource('/roles', RoleController::class)->names('roles');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'givePermission'])->name('givepermission');
    Route::delete('/roles/{role}/permissions/{permission}', [RoleController::class, 'revokePermission'])->name('roles.permission.revoke');

    // users
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::post('/users/{user}/roles', [UserController::class, 'assignRole'])->name('users.roles');
    Route::delete('/users/{user}/roles/{role}', [UserController::class, 'removeRole'])->name('users.roles.remove');

    Route::get('/stream-download', [StreamDownloadController::class, 'index'])->name('streamdownload');
    Route::get('/download/edit/{id}', [DownloadController::class, 'edit'])->name('download.edit');
    Route::put('/download/update/{id}', [DownloadController::class, 'update'])->name('download.update');
    Route::delete('/download/destroy/{id}', [DownloadController::class, 'destroy'])->name('download.destroy');

    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings/store', [SettingController::class, 'store'])->name('settings.store');

    Route::get('/banner', [BannerController::class, 'index'])->name('banner.index');
    Route::post('/banner/store', [BannerController::class, 'store'])->name('banner.store');
    Route::delete('/banner/destroy/{id}', [BannerController::class, 'destroy'])->name('banner.destroy');
    Route::post('/banner/update/{id}', [BannerController::class, 'update'])->name('banner.update');
});
Route::middleware('last_activity')->group(function () {

    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/post/{posts:slug}', [PostController::class, 'show'])->name('post.show');

    Route::get('/stream/{id}', function (string $id) {
        $data = Post::where('id', $id)->with('likedByUsers', 'genres', 'bookmarkedByUsers', 'streams', 'downloads')->first();
        $data->increment('views');
        return Inertia::render('Stream', [
            'postdata' => $data,
        ]);
    })->name('stream');

    Route::get('/explore', [ExploreController::class, 'index'])->name('explore.index');

    Route::middleware('auth')->group(function () {
        Route::get('/request', [UserRequestController::class, 'index'])->name('request.index');
        Route::post('/request/store', [UserRequestController::class, 'store'])->name('request.store');
        Route::delete('/request/destroy/{id}', [UserRequestController::class, 'destroy'])->name('request.destroy');
        Route::get('/notifications', [UserNotificationsController::class, 'index'])->name('usernotifications.index');
        Route::delete('/notifications/destroy/{id}', [UserNotificationsController::class, 'destroy'])->name('usernotifications.destroy');

        Route::get('/report/all', [ReportController::class, 'index'])->name('report.index');
        Route::patch('/report/update/{id}', [ReportController::class, 'update'])->name('report.update');

        Route::get('/user-profile', [UserProfileController::class, 'edit'])->name('userprofile.edit');
        Route::post('/user-profile/update', [UserProfileController::class, 'update'])->name('userprofile.update');

        Route::get('/history', [UserHistoryController::class, 'index'])->name('history.index');

        Route::get('/bookmark', function () {
            $data = auth()->user()->bookmarkedPosts;

            return Inertia::render('Users/Bookmark', [
                'bookmarks' => $data
            ]);
        })->name('bookmark');

        Route::get('/like', function () {
            $data = auth()->user()->likedPosts;

            return Inertia::render('Users/Like', [
                'likes' => $data
            ]);
        })->name('like');
    });
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Users/Dashboard');
// })->name('dashboard');

require __DIR__ . '/auth.php';
