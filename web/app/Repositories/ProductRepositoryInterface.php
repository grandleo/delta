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
}
