<?php

namespace App\Repositories;

use App\Models\OrderStatusPhase;
use Illuminate\Support\Collection;

interface OrderStatusPhaseRepositoryInterface
{
    /**
    * @param $place_category_id
    * @return Collection
    */
    public function getByPlaceCategoryId($place_category_id): Collection;
}
