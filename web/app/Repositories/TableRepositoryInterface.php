<?php

namespace App\Repositories;

use App\Models\Table;
use Illuminate\Support\Collection;

interface TableRepositoryInterface
{
    /**
    * @param $place_id
    * @param bool $all
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id, $all = false): Collection;

    /**
    * @param $id
    * @param array $attributes
    * @return Table
    */
    public function updateFromForm($id, array $attributes): ?Table;

    /**
     * @param $id
     *
     * @return Table|null
     */
    public function findWithTrashed($id): ?Table;

    /**
     * @param $id
     *
     * @return mixed
     */
    public function destroy($id);
}
