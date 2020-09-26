<?php

namespace App\Repositories;

use App\Models\ProductCategory;
use Illuminate\Support\Collection;

interface ProductCategoryRepositoryInterface
{
    /**
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id): Collection;
}
