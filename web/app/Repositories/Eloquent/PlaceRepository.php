<?php

namespace App\Repositories\Eloquent;

use App\Repositories\PlaceRepositoryInterface;

use App\Models\Place;
use Illuminate\Support\Collection;

class PlaceRepository extends BaseRepository implements PlaceRepositoryInterface
{
    /**
    * UserRepository constructor.
    *
    * @param Place $model
    */
    public function __construct(Place $model)
    {
        parent::__construct($model);
    }

    /**
    * @return Collection
    */
    public function getAllSorted(): Collection
    {
        return $this->model
            ->with('placeCategory')
            ->orderBy('sort')
            ->get();
    }

    /**
    * @return Place
    */
    public function findBySlug($slug): ?Place
    {
        return $this->model->where('slug', $slug)->first();
    }

}
