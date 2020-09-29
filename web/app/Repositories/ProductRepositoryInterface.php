<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\Collection;

interface ProductRepositoryInterface
{
    /**
    * @param $place_id
    * @param $product_ids
    * @return Collection
    */
    public function getByPlaceIdAndProductIds($place_id, $product_ids): Collection;

    /**
    * @param $product_category_id
    * @return Collection
    */
    public function getByProductCategoryId($product_category_id): Collection;
}
