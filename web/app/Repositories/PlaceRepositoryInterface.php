<?php

namespace App\Repositories;

use App\Models\Place;
use Illuminate\Support\Collection;

interface PlaceRepositoryInterface
{
    /**
    * @return Collection
    */
    public function getAllSorted(): Collection;

    /**
    * @param sting $slug
    * @return Place
    */
    public function findBySlug($slug): ?Place;
}
