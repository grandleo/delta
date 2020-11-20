<?php

namespace App\Repositories\Eloquent;

use App\Repositories\TableRepositoryInterface;

use App\Models\Table;
use Illuminate\Support\Collection;

class TableRepository extends BaseRepository implements TableRepositoryInterface
{
    /**
    * @param Table $model
    */
    public function __construct(Table $model)
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
            ->with(['workers'])
            ->withTrashed()
            ->where('place_id', $place_id)
            ->orderBy('name');

        if (!$all) {
            $query->status('active');
        }

        return $query->get();
    }

    /**
    * @param $id
    * @param array $attributes
    * @return Table
    */
    public function updateFromForm($id, array $attributes): ?Table
    {
        $model = $this->find($id);

        $model->fill($attributes);

        if (isset($attributes['active'])) {
            $model->setStatus($attributes['active'] ? 'active' : 'draft');
        }

        if (isset($attributes['workers'])) {
            $model->workers()->sync($attributes['workers']);
        }

        $model->save();

        return $model;
    }

    public function findWithTrashed($id) : ?Table
    {
        return $this->model->withTrashed()->find($id);
    }
}
