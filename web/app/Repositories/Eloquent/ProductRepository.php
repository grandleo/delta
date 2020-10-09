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
            ->status('active')
            ->get();
    }

    /**
    * @param $product_category_id
    * @param bool $all
    * @return Collection
    */
    public function getByProductCategoryId($product_category_id, $all = false): Collection
    {
        $query = $this->model
            ->where('product_category_id', $product_category_id)
            ->orderBy('sort');

        if (!$all) {
            $query->status('active');
        }

        return $query->get();
    }

    /**
    * @param $id
    * @param array $attributes
    * @return Product
    */
    public function updateFromForm($id, array $attributes): ?Product
    {
        $model = $this->find($id);

        $model->fill($attributes);

        if (isset($attributes['active'])) {
            $model->setStatus($attributes['active'] ? 'active' : 'draft');
        }

        if (!empty($attributes['params'])) {
            foreach ($attributes['params'] as $key => $value) {
                $model->setJson('params', $key, $value);
            }
        }

        $model->save();

        return $model;
    }

    /**
    * @param $product_category_id
    * @param array $sort
    * @return bool
    */
    public function resort($product_category_id, array $sort): bool
    {
        foreach ($sort as $key => $id) {
            $this->model->query()
                ->where('product_category_id', $product_category_id)
                ->where('id', $id)
                ->update(['sort' => $key]);
        }

        return true;
    }

}
