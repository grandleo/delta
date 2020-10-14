<?php

namespace App\Repositories;

use App\Models\OrderStatus;
use Illuminate\Support\Collection;

interface OrderStatusRepositoryInterface
{
    /**
    * @param $place_category_id
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceCategoryIdAndPlaceId($place_category_id, $place_id): Collection;
}
