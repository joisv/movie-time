<?php

use App\Http\Controllers\Dashboard\PostController;
use App\Http\Controllers\ReportController;
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
    
});