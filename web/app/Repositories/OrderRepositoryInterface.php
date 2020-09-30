<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Collection;

interface OrderRepositoryInterface
{
    /**
    * @param $guest_id
    * @return Collection
    */
    public function getByGuestId($guest_id): Collection;

    /**
    * @param $id
    * @param $guest_id
    * @return Order
    */
    public function findByIdAndGuestId($id, $guest_id): ?Order;
}