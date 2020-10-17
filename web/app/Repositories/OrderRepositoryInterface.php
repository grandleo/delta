<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Collection;
use App\Models\Message;

interface OrderRepositoryInterface
{
    /**
    * @param $guest_id
    * @param array $conditions
    * @return Collection
    */
    public function getByGuestId($guest_id, array $conditions = []): Collection;

    /**
    * @param $place_id
    * @param $worker_id
    * @param bool $all
    * @param array $conditions
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id, $worker_id = null, $all = false, array $conditions = []): Collection;
    /**
    * @param $id
    * @param $guest_id
    * @return Order
    */
    public function findByIdAndGuestId($id, $guest_id): ?Order;

    /**
    * @param $id
    * @param array $attributes
    * @return Order
    */
    public function updateFromForm($id, array $attributes): ?Order;

    /**
    * @param $id
    * @param array $attributes
    * @return Message
    */
    public function messageCreate($id, array $attributes): Message;

    /**
    * @param $id
    * @return Collection
    */
    public function getOrderOrderStatuses($id): Collection;
}
