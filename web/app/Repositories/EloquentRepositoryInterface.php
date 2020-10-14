<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

interface EloquentRepositoryInterface
{
    /**
    * @param array $attributes
    * @return Model
    */
    public function create(array $attributes): Model;

    /**
    * @param $id
    * @param array $with
    * @return Model
    */
    public function find($id, $with = []): ?Model;

    /**
    * @param array $conditions
    * @return Model
    */
    public function findByWhere(array $conditions): ?Model;

    /**
    * @param $id
    * @return Model
    */
    public function delete($id): ?Model;
}
