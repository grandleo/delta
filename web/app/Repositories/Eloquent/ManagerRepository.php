<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ManagerRepositoryInterface;

use App\Models\Manager;
use Illuminate\Support\Collection;

use Illuminate\Support\Facades\Hash;

class ManagerRepository extends BaseRepository implements ManagerRepositoryInterface
{
    /**
    * @param Manager $model
    */
    public function __construct(Manager $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $id
    * @param array $attributes
    * @return Manager
    */
    public function updateFromForm($id, array $attributes): ?Manager
    {
        $model = $this->find($id);

        if (!empty($attributes['password'])) {
            $attributes['password'] = Hash::make($attributes['password']);
        } else {
            unset($attributes['password']);
        }

        $model->fill($attributes);

        $model->save();

        return $model;
    }
}
