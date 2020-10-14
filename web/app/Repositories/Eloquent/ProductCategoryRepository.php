<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ProductCategoryRepositoryInterface;

use App\Models\ProductCategory;
use Illuminate\Support\Collection;

class ProductCategoryRepository extends BaseRepository implements ProductCategoryRepositoryInterface
{
    /**
    * @param ProductCategory $model
    */
    public function __construct(ProductCategory $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_id
    * @param bool $all
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id, $all = false): Collection
    {
        $query = $this->model
            ->where('place_id', $place_id)
            ->withCount(['products' => function ($query) {
                $query->status('active');
            }])
            ->orderBy('sort');

        if (!$all) {
            $query->status('active');
        }

        return $query->get();
    }

    /**
    * @param $id
    * @param array $attributes
    * @return ProductCategory
    */
    public function updateFromForm($id, array $attributes): ?ProductCategory
    {
        $model = $this->find($id);

        $model->fill($attributes);

        if (isset($attributes['active'])) {
            $model->setStatus($attributes['active'] ? 'active' : 'draft');
        }

        $model->save();

        return $model;
    }

    /**
    * @param $place_id
    * @param array $sort
    * @return bool
    */
    public function resort($place_id, array $sort): bool
    {
        foreach ($sort as $key => $id) {
            $this->model->query()
                ->where('place_id', $place_id)
                ->where('id', $id)
                ->update(['sort' => $key]);
        }

        return true;
    }

}
