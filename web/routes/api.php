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

Route::get('places', function (Request $request) {
    return \Storage::response('fake-api/places.json');
});

Route::get('places/{placeId}', function (Request $request) {
    return \Storage::response('fake-api/placeById.json');
});

Route::get('places/{placeId}/{serviceCategoryId}', function (Request $request) {
    return \Storage::response('fake-api/placeServicesByCategory.json');
});
