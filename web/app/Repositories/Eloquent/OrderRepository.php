<?php

namespace App\Repositories\Eloquent;

use App\Repositories\OrderRepositoryInterface;

use App\Models\Order;
use Illuminate\Support\Collection;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    /**
    * @param Order $model
    */
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }
}
