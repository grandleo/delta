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

    /**
    * @param string $name
    * @param $id
    * @return string
    */
    public function getFreeSlug(string $name, $id = null): string;

    /**
    * @param $id
    * @param array $attributes
    * @return Place
    */
    public function updateFromForm($id, array $attributes): ?Place;
}
