<?php

use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Dashboard\AdminRequestController;
use App\Http\Controllers\Dashboard\AnalitycsController;
use App\Http\Controllers\Dashboard\CommentController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\StreamController;
use App\Http\Controllers\Dashboard\UserNotificationsController;
use App\Http\Controllers\Dashboard\UserRequestController;
use App\Http\Controllers\GenerateMovieController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserHistoryController;
use App\Models\Comment;
use App\Models\Genre;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Report;
use App\Models\Request as ModelsRequest;
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

Route::get('/post-comment/{id}', [CommentController::class, 'postComment'])->name('api.postcomment');
Route::get('/banner/poster', [HomeController::class, 'getBanner'])->name('get.banner');
Route::get('/banner/visit', [BannerController::class, 'visit'])->name('banner.visit');
Route::get('/search/movie', [HomeController::class, 'searchMovie'])->name('search.movie');

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::delete('/post-delete/{id}', [PostController::class, 'destroy'])->name('api.post.destroy');
    Route::post('/genereate-movie/{id}', [GenerateMovieController::class, 'generate'])->name('generate');
    Route::get('/generate-genre', [GenerateMovieController::class, 'generateMovieGenre'])->name('generate.genre');
    Route::get('/search', [PostController::class, 'search'])->name('search');
    Route::get('/search/genres', [GenreController::class, 'search'])->name('search.genres');
    Route::get('/search/stream', [StreamController::class, 'search'])->name('stream.search');
    Route::get('/search/report', [ReportController::class, 'search'])->name('report.search');
    Route::get('/search/download', [DownloadController::class, 'search'])->name('download.search');
    Route::get('/search/user', [UserController::class, 'search'])->name('user.search');
    Route::get('/get-post', function () {

        $data = Post::all();
        return response()->json($data);
    })->name('getpost');
    Route::delete('/users/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    Route::delete('/stream/destroy/{id}', [StreamController::class, 'destroy'])->name('stream.destroy');
    Route::delete('/report/destroy/{id}', [ReportController::class, 'destroy'])->name('api.report.destroy');
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
    Route::get('/genre/{id}', function (string $id) {
        $genre = Genre::where('id', $id)->first();
        return response()->json([
            'genre' => $genre,
        ]);
    })->name('api.genre.show');
    Route::get('/report/{id}', function (string $id) {
        $report = Report::where('id', $id)->with('post', 'user')->first();
        return response()->json([
            'report' => $report,
        ]);
    })->name('api.report.show');
    Route::get('/banner/edit/{id}', [BannerController::class, 'edit'])->name('api.banner.edit');

    Route::get('/request/count', function(){
        $req = ModelsRequest::where('is_new', true)->count();
        return response()->json($req);
    })->name('api.request.count');

    Route::get('/report/count/is-new', function(){
        $req = Report::where('is_new', true)->count();
        return response()->json($req);
    })->name('api.usereport.count');

    Route::get('/user-count', [ AnalitycsController::class, 'userCount' ])->name('usercount');
    Route::get('/report-status', [ AnalitycsController::class, 'reportStatus' ])->name('reportstatus');
    Route::get('/post-most', [ AnalitycsController::class, 'mostmovie' ])->name('mostmovie');
    Route::get('/post/views/bydays', [ AnalitycsController::class, 'postViewByDays' ])->name('post.bydays');
    Route::get('/post/views/weeks', [ AnalitycsController::class, 'postViewByWeeks' ])->name('post.byweeks');
    Route::get('/post/views/month', [ AnalitycsController::class, 'postViewByMonth' ])->name('post.bymonth');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/history/store', [UserHistoryController::class, 'store'])->name('history.store');
    Route::post('/like-post/{id}', [PostController::class, 'likePost'])->name('post.like');
    Route::post('/bookmark-post/{id}', [PostController::class, 'bookmark'])->name('post.bookmark');
    Route::post('/report-post', [ReportController::class, 'store'])->name('report.store');

    Route::get('/notification', function () {
        $user = auth()->user();
        $data = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        return response()->json(['notifications' => $data], 200);
    })->name('notification');

    Route::patch('/notification/update/{id}', [UserNotificationsController::class, 'update'])->name('notification.update');
    
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
});
