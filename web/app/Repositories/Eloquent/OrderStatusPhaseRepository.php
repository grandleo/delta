<?php

namespace App\Repositories\Eloquent;

use App\Repositories\OrderStatusPhaseRepositoryInterface;

use App\Models\OrderStatusPhase;
use Illuminate\Support\Collection;

class OrderStatusPhaseRepository extends BaseRepository implements OrderStatusPhaseRepositoryInterface
{
    /**
    * @param OrderStatusPhase $model
    */
    public function __construct(OrderStatusPhase $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_category_id
    * @return Collection
    */
    public function getByPlaceCategoryId($place_category_id): Collection
    {
        return $this->model
            ->where(function($query1) use ($place_category_id) {
                $query1->whereNull('place_category_id');
                if ($place_category_id) {
                    $query1->orWhere('place_category_id', $place_category_id);
                }
            })
            ->orderBy('sort')
            ->get();
    }
}
