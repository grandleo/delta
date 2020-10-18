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

Route::prefix('v1/guest')
->namespace('App\Http\Controllers\Api\v1\Guest')
->group(function () {
    // auth
    Route::post('auth/login', 'AuthApiController@login');
    Route::post('auth/register', 'AuthApiController@register');

    // private
    Route::middleware(['auth:sanctum', 'auth.sanctum.ext:App\Models\Guest'])
    ->group(function () {
        Route::put('cart/{id}', 'CartApiController@update');
        Route::post('orders/{id}/message', 'OrderApiController@storeMessage');
        Route::resource('orders', 'OrderApiController')->only([
            'index', 'show',
        ]);
        Route::post('notifs/mark-read', 'NotifApiController@markRead');
        Route::resource('notifs', 'NotifApiController')->only([
            'index',
        ]);
        Route::resource('images', 'ImageApiController')->only([
            'store',
        ]);
        Route::post('auth/update', 'AuthApiController@update');
    });

    // public
    Route::resource('places', 'PlaceApiController')->only([
        'index', 'show',
    ]);
    Route::resource('product-categories', 'ProductCategoryApiController')->only([
        'show',
    ]);
    Route::resource('products', 'ProductApiController')->only([
        'show',
    ]);
    Route::resource('cart', 'CartApiController')->only([
        'index', 'store',
    ]);
});

Route::prefix('v1/manager')
->namespace('App\Http\Controllers\Api\v1\Manager')
->group(function () {
    // auth
    Route::post('auth/login', 'AuthApiController@login');
    Route::post('auth/register', 'AuthApiController@register');

    // private
    Route::middleware(['auth:sanctum', 'auth.sanctum.ext:App\Models\Manager'])
    ->group(function () {
        Route::resource('images', 'ImageApiController')->only([
            'store',
        ]);
        Route::resource('user', 'UserApiController')->only([
            'show',
        ]);
        Route::resource('tables', 'TableApiController')->only([
            'index', 'show', 'update', 'destroy',
        ]);
        Route::resource('workers', 'WorkerApiController')->only([
            'index', 'show', 'update', 'destroy',
        ]);
        Route::post('orders/{id}/setOrderStatus', 'OrderApiController@setOrderStatus');
        Route::post('orders/{id}/message', 'OrderApiController@storeMessage');
        Route::resource('orders', 'OrderApiController')->only([
            'index', 'show', 'update',
        ]);
        Route::resource('guests', 'GuestApiController')->only([
            'index',
        ]);
        Route::post('product-categories/resort', 'ProductCategoryApiController@resort');
        Route::resource('product-categories', 'ProductCategoryApiController')->only([
            'index', 'show', 'update', 'destroy',
        ]);
        Route::post('products/resort', 'ProductApiController@resort');
        Route::resource('products', 'ProductApiController')->only([
            'index', 'show', 'update', 'destroy',
        ]);
        Route::resource('settings', 'SettingsApiController')->only([
            'show', 'update',
        ]);
        Route::post('notifs/mark-read', 'NotifApiController@markRead');
        Route::resource('notifs', 'NotifApiController')->only([
            'index',
        ]);
        Route::resource('finances', 'FinanceApiController')->only([
            'index',
        ]);
    });
});


Route::prefix('v1/worker')
->namespace('App\Http\Controllers\Api\v1\Worker')
->group(function () {
    // auth
    Route::post('auth/login', 'AuthApiController@login');

    // private
    Route::middleware(['auth:sanctum', 'auth.sanctum.ext:App\Models\Worker'])
    ->group(function () {
        Route::post('orders/{id}/takeOrder', 'OrderApiController@takeOrder');
        Route::post('orders/{id}/setOrderStatus', 'OrderApiController@setOrderStatus');
        Route::post('orders/{id}/message', 'OrderApiController@storeMessage');
        Route::resource('orders', 'OrderApiController')->only([
            'index', 'show', 'update',
        ]);
        Route::post('notifs/mark-read', 'NotifApiController@markRead');
        Route::resource('notifs', 'NotifApiController')->only([
            'index',
        ]);
    });
});
