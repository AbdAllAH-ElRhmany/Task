<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
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

// Public routes (no authentication required)
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');

// Protected routes (require authentication)
Route::middleware('auth:api')->group(function () {
    // User-related routes
    Route::resource('users', UserController::class);

    // Authenticated user information
    Route::get('user', [AuthController::class, 'user']);

    // Logout route
    Route::post('logout', [AuthController::class, 'logout']);

    // Passport routes (tokens)
    Route::post('oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('mail', [UserController::class, 'mail']);
});
