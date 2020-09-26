<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\EloquentRepositoryInterface;
use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\Eloquent\PlaceRepository;
use App\Repositories\ProductCategoryRepositoryInterface;
use App\Repositories\Eloquent\ProductCategoryRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(PlaceRepositoryInterface::class, PlaceRepository::class);
        $this->app->bind(ProductCategoryRepositoryInterface::class, ProductCategoryRepository::class);
    }
}
