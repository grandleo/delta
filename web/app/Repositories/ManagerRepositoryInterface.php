<?php

namespace App\Repositories;

use App\Models\Manager;
use Illuminate\Support\Collection;

interface ManagerRepositoryInterface
{
    /**
    * @param $id
    * @param array $attributes
    * @return Manager
    */
    public function updateFromForm($id, array $attributes): ?Manager;
}
