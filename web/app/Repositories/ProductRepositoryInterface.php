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
    * @param bool $all
    * @return Collection
    */
    public function getByProductCategoryId($product_category_id, $all = false): Collection;

    /**
    * @param $id
    * @param array $attributes
    * @return Product
    */
    public function updateFromForm($id, array $attributes): ?Product;

    /**
    * @param $product_category_id
    * @param array $sort
    * @return bool
    */
    public function resort($product_category_id, array $sort): bool;
}
