<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1/guest')
->namespace('App\Http\Controllers\Api\v1\Guest')
->group(function () {
    // auth
    Route::post('auth/login', 'AuthApiController@login');
    Route::post('auth/register', 'AuthApiController@register');

    // private
    Route::middleware('auth:sanctum')
    ->group(function () {
        Route::put('cart/{id}', 'CartApiController@update');
        Route::resource('orders', 'OrderApiController')->only([
            'index', 'show',
        ]);
    });

    // public
    Route::resource('places', 'PlaceApiController')->only([
        'index', 'show',
    ]);
    Route::resource('product-categories', 'ProductCategoryApiController')->only([
        'show',
    ]);
    Route::resource('cart', 'CartApiController')->only([
        'index', 'store',
    ]);
});
