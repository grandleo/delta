<?php

namespace App\Repositories\Eloquent;

use App\Repositories\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements EloquentRepositoryInterface
{
    /**
     * @var Model
     */
     protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
    * @param array $attributes
    *
    * @return Model
    */
    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    /**
    * @param $id
    * @return Model
    */
    public function find($id): ?Model
    {
        return $this->model->find($id);
    }

    /**
    * @param array $conditions
    * @return Model
    */
    public function findByWhere(array $conditions): ?Model
    {
        return $this->model->where($conditions)->first();
    }

    /**
    * @param $id
    * @return Model
    */
    public function delete($id): ?Model
    {
        $model = $this->model->find($id);
        $model->delete();
        return $model;
    }
}
