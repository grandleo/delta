<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ManagerRepositoryInterface;

use App\Models\Manager;
use Illuminate\Support\Collection;

class ManagerRepository extends BaseRepository implements ManagerRepositoryInterface
{
    /**
    * @param Manager $model
    */
    public function __construct(Manager $model)
    {
        parent::__construct($model);
    }
}
