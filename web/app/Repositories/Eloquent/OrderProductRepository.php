<?php

namespace App\Repositories\Eloquent;

use App\Repositories\OrderProductRepositoryInterface;

use App\Models\OrderProduct;
use Illuminate\Support\Collection;

class OrderProductRepository extends BaseRepository implements OrderProductRepositoryInterface
{
    /**
    * @param OrderProduct $model
    */
    public function __construct(OrderProduct $model)
    {
        parent::__construct($model);
    }
}
