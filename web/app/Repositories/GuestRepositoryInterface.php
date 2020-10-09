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
}
