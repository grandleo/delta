<?php

use Illuminate\Support\Facades\Route;

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
Route::group(['middleware' => 'admin.guest', 'prefix' => 'admin',  'as' => 'admin.'], function () {
    Route::view('/login', 'admin.login');
    Route::post('/login', [App\Http\Controllers\Admin\AuthController::class, 'login'])->name('login');
});

Route::group(['middleware' => 'admin.auth', 'prefix' => 'admin',  'as' => 'admin.'], function() {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/places', App\Http\Controllers\Admin\PlaceController::class);
    Route::resource('/worker', App\Http\Controllers\Admin\WorkerController::class);
    Route::resource('/table', App\Http\Controllers\Admin\TableController::class);
    Route::resource('/order', App\Http\Controllers\Admin\OrderController::class);
    Route::resource('/guest', App\Http\Controllers\Admin\GuestController::class);
    Route::get('/table/{id}/restore', [App\Http\Controllers\Admin\TableController::class, 'restore']);
    Route::get('/worker/{id}/restore', [App\Http\Controllers\Admin\WorkerController::class, 'restore']);
});

Route::get('/mid{marker_code}', [App\Http\Controllers\TableMarkerController::class, 'index'])
    ->where('marker_code', '\d+');

Route::view('/', 'landing-guest')->name('landing-guest');

Route::view('/manager/{any?}', 'manager')->where('any', '.*');
Route::view('/worker/{any?}', 'worker')->where('any', '.*');
Route::view('/guest/{path?}', 'guest');

Route::view('/{path?}/{path1?}', 'guest');
