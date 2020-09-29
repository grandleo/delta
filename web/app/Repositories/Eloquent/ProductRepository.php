<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ProductRepositoryInterface;

use App\Models\Product;
use Illuminate\Support\Collection;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
    * @param Product $model
    */
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_id
    * @param $product_ids
    * @return Collection
    */
    public function getByPlaceIdAndProductIds($place_id, $product_ids): Collection
    {
        return $this->model
            ->where('place_id', $place_id)
            ->whereIn('id', $product_ids)
            ->get();
    }

    /**
    * @param $product_category_id
    * @return Collection
    */
    public function getByProductCategoryId($product_category_id): Collection
    {
        return $this->model
            ->where('product_category_id', $product_category_id)
            ->orderBy('sort')
            ->get();
    }

}
