<?php

namespace App\Repositories\Eloquent;

use App\Repositories\WorkerRepositoryInterface;

use App\Models\Worker;
use Illuminate\Support\Collection;

class WorkerRepository extends BaseRepository implements WorkerRepositoryInterface
{
    /**
    * @param Worker $model
    */
    public function __construct(Worker $model)
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
            ->withTrashed()
            ->with(['tables'])
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
    * @return Worker
    */
    public function updateFromForm($id, array $attributes): ?Worker
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

        if (isset($attributes['tables'])) {
            $model->tables()->sync($attributes['tables']);
        }

        $model->save();

        return $model;
    }

    /**
     * @param $id
     *
     * @return Worker|null
     */
    public function findWithTrashed($id) : ?Worker
    {
        return $this->model->withTrashed()->find($id);
    }

    /**
     * @param $id
     *
     * @return bool|mixed
     */
    public function destroy($id)
    {
        $model = $this->model->withTrashed()->find($id);
        if(!$model->trashed()){
            $model->delete();
        }
        else {
            $model->forceDelete();
        }
        return true;
    }

}
