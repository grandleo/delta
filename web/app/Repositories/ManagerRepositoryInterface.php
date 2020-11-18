<?php

namespace App\Repositories;

use App\Models\Manager;
use Illuminate\Support\Collection;

interface ManagerRepositoryInterface
{
    /**
    * @param $place_id
    * @return Manager
    */
    public function findByPlaceId($place_id): ?Manager;

    /**
    * @param $id
    * @param array $attributes
    * @return Manager
    */
    public function updateFromForm($id, array $attributes): ?Manager;

    /**
     * @param $email
     * @param $password
     *
     * @return Manager|null
     */
    public function updatePassword($email, $password): ?Manager;
}
