<?php

use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Dashboard\CommentController;
use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\Dashboard\StreamController;
use App\Http\Controllers\Dashboard\UserNotificationsController;
use App\Http\Controllers\GenerateMovieController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/post-show/{id}', [PostController::class, 'showByApi'])->name('api.post.show');
Route::get('/post-comment/{id}', function(string $id) {
    $comments = Comment::where('post_id', $id)->orderBy('created_at', 'desc')->with('user')->get();
    $comments_count = $comments->count();
    return response()->json([
        'comments' => $comments,
        'count' => $comments_count
    ]);
})->name('api.postcomment');

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::delete('/post-delete/{id}', [PostController::class, 'destroy'])->name('api.post.destroy');
    Route::post('/genereate-movie/{id}', [GenerateMovieController::class, 'generate'])->name('generate');
    Route::get('/generate-genre', [GenerateMovieController::class, 'generateMovieGenre'])->name('generate.genre');
    Route::get('/search', [PostController::class, 'search'])->name('search');
    Route::get('/search/genres', [GenreController::class, 'search'])->name('search.genres');
    Route::get('/search/stream', [StreamController::class, 'search'])->name('stream.search');
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

    Route::get('/request/count', function(){
        $req = ModelsRequest::where('is_new', true)->count();
        return response()->json($req);
    })->name('api.request.count');
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

    Route::patch('/notification/update', [UserNotificationsController::class, 'update'])->name('notification.update');
    
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
});
