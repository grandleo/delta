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

Route::get('/mid{marker_code}', [App\Http\Controllers\TableMarkerController::class, 'index'])
    ->where('marker_code', '\d+');

Route::view('/', 'landing-guest')->name('landing-guest');

Route::view('/manager/{any?}', 'manager')->where('any', '.*');
Route::view('/worker/{any?}', 'worker')->where('any', '.*');
Route::view('/guest/{path?}', 'guest');

Route::view('/{path?}/{path1?}', 'guest');
