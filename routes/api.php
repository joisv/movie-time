<?php

use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\GenerateMovieController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserHistoryController;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/like-post/{id}', [PostController::class, 'likePost'])->name('post.postlike');
    Route::post('/bookmark-post/{id}', [PostController::class, 'bookmark'])->name('post.bookmark');
    
    Route::post('/report-post', [ReportController::class, 'store'])->name('report.store');

    Route::get('/notification', function() {
        $user = auth()->user();
        $data = Notification::where('user_id', $user->id)
        ->where('is_read', false)
        ->count();

        return response()->json(['notifications' => $data], 200);
    })->name('notification');

    Route::put('/notification/update', function(Request $request) {
        
        try {
            $user = auth()->user();

            if( $user->id == $request->user_id ){

                $data = Notification::findOrfail($request->id);
                $data->is_read = true;
                $data->save();

                return response()->json(['message' => 'berhasil'], 200);
            }

        } catch (\Throwable $th) {
            return response()->json('something went wrong');
        }
    })->name('notification.update');

    Route::post('/history/store', [UserHistoryController::class, 'store'])->name('history.store');
    
    Route::post('/genereate-movie/{id}',[GenerateMovieController::class, 'generate'])->name('generate');
    Route::get('/generate-genre', [GenerateMovieController::class, 'generateMovieGenre'])->name('generate.genre');

    Route::get('/search', [PostController::class, 'search'])->name('search');
});