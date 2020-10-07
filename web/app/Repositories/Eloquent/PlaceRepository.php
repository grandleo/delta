<?php

namespace App\Repositories\Eloquent;

use App\Repositories\PlaceRepositoryInterface;

use App\Models\Place;
use Illuminate\Support\Collection;

class PlaceRepository extends BaseRepository implements PlaceRepositoryInterface
{
    /**
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

    /**
    * @param string $name
    * @param $id
    * @return string
    */
    public function getFreeSlug(string $name, $id = null): string
    {
        $slug = \Str::slug($name);

        $query = $this->model->query()
            ->where('slug', $slug);
        if ($id) {
            $query->where('id', '!=', $id);
        }
        $count = $query->count();

        return (!$count) ? $slug : $slug.'-'.rand(111, 999);
    }

    /**
    * @param $id
    * @param array $attributes
    * @return Place
    */
    public function updateFromForm($id, array $attributes): ?Place
    {
        $model = $this->find($id);

        $model->fill($attributes);

        if (!empty($attributes['params'])) {
            foreach ($attributes['params'] as $key => $value) {
                $model->setJson('params', $key, $value);
            }
        }

        $model->save();

        return $model;
    }

}
