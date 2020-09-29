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
    Route::apiResource('places', 'PlaceApiController')->only([
        'index', 'show',
    ]);
    Route::apiResource('product-categories', 'ProductCategoryApiController')->only([
        'show',
    ]);
    Route::apiResource('cart', 'CartApiController')->only([
        'index', 'store',
    ]);
    ]);
});
