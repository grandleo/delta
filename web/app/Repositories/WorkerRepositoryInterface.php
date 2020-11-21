<?php

namespace App\Repositories;

use App\Models\Worker;
use Illuminate\Support\Collection;

interface WorkerRepositoryInterface
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
    * @return Worker
    */
    public function updateFromForm($id, array $attributes): ?Worker;

    /**
     * @param $id
     *
     * @return Worker|null
     */
    public function findWithTrashed($id): ?Worker;

    /**
     * @param $id
     *
     * @return mixed
     */
    public function destroy($id);
}
