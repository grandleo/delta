<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\EloquentRepositoryInterface;
use App\Repositories\Eloquent\BaseRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $reps = [
            'PlaceCategory',
            'Place',
            'ProductCategory',
            'Product',
            'Order',
            'OrderProduct',
            'Guest',
            'Manager',
            'Table',
            'Worker',
            'OrderStatus',
            'OrderStatusPhase',
        ];

        // Eloquent
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        foreach ($reps as $rep) {
            $this->app->bind(
                'App\\Repositories\\'.$rep.'RepositoryInterface',
                'App\\Repositories\\Eloquent\\'.$rep.'Repository'
            );
        }
    }
}
