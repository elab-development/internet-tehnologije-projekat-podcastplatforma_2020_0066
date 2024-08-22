<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\EpisodeController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/podcasts', [PodcastController::class, 'index']);
Route::post('/podcasts', [PodcastController::class, 'store'])->middleware('auth:sanctum');
Route::get('/podcasts/{id}', [PodcastController::class, 'show']);
Route::put('/podcasts/{id}', [PodcastController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/podcasts/{id}', [PodcastController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/podcasts/{podcastId}/episodes', [EpisodeController::class, 'index']);
Route::post('/podcasts/{podcastId}/episodes', [EpisodeController::class, 'store'])->middleware('auth:sanctum');
Route::get('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'show']);
Route::put('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/podcasts/{podcastId}/episodes/{id}', [EpisodeController::class, 'destroy'])->middleware('auth:sanctum');