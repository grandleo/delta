<?php

namespace App\Repositories\Eloquent;

use App\Repositories\PlaceCategoryRepositoryInterface;

use App\Models\PlaceCategory;
use Illuminate\Support\Collection;

class PlaceCategoryRepository extends BaseRepository implements PlaceCategoryRepositoryInterface
{
    /**
    * @param PlaceCategory $model
    */
    public function __construct(PlaceCategory $model)
    {
        parent::__construct($model);
    }

    /**
    * @return Collection
    */
    public function getAllSorted(): Collection
    {
        return $this->model
            ->orderBy('name')
            ->get();
    }
}
