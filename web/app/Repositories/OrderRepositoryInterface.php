<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Support\Collection;
use App\Models\Message;

interface OrderRepositoryInterface
{
    /**
    * @param $guest_id
    * @return Collection
    */
    public function getByGuestId($guest_id): Collection;

    /**
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id): Collection;

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
