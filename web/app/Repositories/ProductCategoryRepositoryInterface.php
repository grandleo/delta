<?php

namespace App\Repositories;

use App\Models\ProductCategory;
use Illuminate\Support\Collection;

interface ProductCategoryRepositoryInterface
{
    /**
    * @param $place_id
    * @param bool $all
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id, $all = false): Collection;

    /**
    * @param $id
    * @param array $attributes
    * @return ProductCategory
    */
    public function updateFromForm($id, array $attributes): ?ProductCategory;

    /**
    * @param $place_id
    * @param array $sort
    * @return bool
    */
    public function resort($place_id, array $sort): bool;
}
