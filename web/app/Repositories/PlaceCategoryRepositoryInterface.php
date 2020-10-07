<?php

namespace App\Repositories;

use App\Models\PlaceCategory;
use Illuminate\Support\Collection;

interface PlaceCategoryRepositoryInterface
{
    /**
    * @return Collection
    */
    public function getAllSorted(): Collection;
}
