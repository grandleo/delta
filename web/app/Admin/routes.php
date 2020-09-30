<?php

use Illuminate\Routing\Router;

Admin::routes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
    'as'            => config('admin.route.prefix') . '.',
], function (Router $router) {

    $router->get('/', 'HomeController@index')->name('home');

    $router->resource('managers', ManagerController::class);

    $router->resource('place-categories', PlaceCategoryController::class);

    $router->resource('places', PlaceController::class);

    $router->resource('product-categories', ProductCategoryController::class);

    $router->resource('products', ProductController::class);

    $router->resource('orders', OrderController::class);

});
