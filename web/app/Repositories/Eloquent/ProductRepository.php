<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ProductRepositoryInterface;

use App\Models\Product;
use Illuminate\Support\Collection;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
    * UserRepository constructor.
    *
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

}
