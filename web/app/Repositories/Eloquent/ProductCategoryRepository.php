<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ProductCategoryRepositoryInterface;

use App\Models\ProductCategory;
use Illuminate\Support\Collection;

class ProductCategoryRepository extends BaseRepository implements ProductCategoryRepositoryInterface
{
    /**
    * UserRepository constructor.
    *
    * @param ProductCategory $model
    */
    public function __construct(ProductCategory $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id): Collection
    {
        return $this->model
            ->where('place_id', $place_id)
            ->withCount('products')
            ->orderBy('sort')
            ->get();
    }

}
