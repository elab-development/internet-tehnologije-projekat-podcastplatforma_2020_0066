<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TranslationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::resource('podcasts', PodcastController::class)->except(['index', 'show']); 
});


//Route::apiResource('podcasts', PodcastController::class);

Route::get('/podcasts/all', [PodcastController::class, 'getall']);

Route::get('/podcasts', [PodcastController::class, 'index']); 
//Route::post('/podcasts', [PodcastController::class, 'store'])->middleware('auth:sanctum'); 
Route::get('/podcasts/{id}', [PodcastController::class, 'show']);
//Route::put('/podcasts/{id}', [PodcastController::class, 'update'])->middleware('auth:sanctum'); 
//Route::delete('/podcasts/{id}', [PodcastController::class, 'destroy'])->middleware('auth:sanctum'); 

Route::get('/podcasts/{podcastId}/episodes', [EpisodeController::class, 'index']);
Route::post('/podcasts/{podcastId}/episodes', [EpisodeController::class, 'store'])->middleware('auth:sanctum');
Route::get('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'show']);
Route::put('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/podcasts/{id}/favorite', [PodcastController::class, 'favorite'])->middleware('auth:sanctum');
Route::delete('/podcasts/{id}/favorite', [PodcastController::class, 'unfavorite'])->middleware('auth:sanctum');
Route::get('/user/favorites', [PodcastController::class, 'favorites'])->middleware('auth:sanctum');

Route::get('/login', [AuthController::class, 'showLoginForm']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/signup', [AuthController::class, 'showSignupForm']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/search-podcasts', [PodcastController::class, 'search']);
Route::get('/podcasts/filter/{user_id}', [PodcastController::class, 'filterByUser']);
Route::get('/admins', [PodcastController::class, 'getAdmins']);
