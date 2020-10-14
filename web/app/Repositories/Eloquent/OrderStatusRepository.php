<?php

namespace App\Repositories\Eloquent;

use App\Repositories\OrderStatusRepositoryInterface;

use App\Models\OrderStatus;
use Illuminate\Support\Collection;

class OrderStatusRepository extends BaseRepository implements OrderStatusRepositoryInterface
{
    /**
    * @param OrderStatus $model
    */
    public function __construct(OrderStatus $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_category_id
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceCategoryIdAndPlaceId($place_category_id, $place_id): Collection
    {
        return $this->model
            ->where(function($query1) use ($place_category_id, $place_id) {
                $query1->whereNull('place_category_id');
                if ($place_category_id) {
                    $query1->orWhere('place_category_id', $place_category_id);
                }
                if ($place_id) {
                    $query1->orWhere('place_id', $place_id);
                }
            })
            ->orderBy('sort')
            ->get();
    }
}
