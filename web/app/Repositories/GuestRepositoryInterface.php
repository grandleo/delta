<?php

namespace App\Repositories;

use App\Models\Guest;
use Illuminate\Support\Collection;

interface GuestRepositoryInterface
{
    /**
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id): Collection;

    /**
    * @param $id
    * @param array $attributes
    * @return Guest
    */
    public function updateFromForm($id, array $attributes): ?Guest;

    /**
     * @param $email
     * @param $password
     *
     * @return Guest|null
     */
    public function updatePassword($email, $password): ?Guest;
}
