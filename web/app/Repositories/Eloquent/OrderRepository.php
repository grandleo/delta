<?php

namespace App\Repositories\Eloquent;

use App\Repositories\OrderRepositoryInterface;

use App\Models\Order;
use Illuminate\Support\Collection;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    /**
    * @param Order $model
    */
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $guest_id
    * @return Collection
    */
    public function getByGuestId($guest_id): Collection
    {
        return $this->model
            ->with([
                'place',
                'place.placeCategory',
                'orderProducts',
            ])
            ->where('guest_id', $guest_id)
            ->status('draft', '!=')
            ->orderByDesc('id')
            ->get();
    }

    /**
    * @param $id
    * @param $guest_id
    * @return Order
    */
    public function findByIdAndGuestId($id, $guest_id): ?Order
    {
        return $this->model
            ->with([
                'place',
                'place.placeCategory',
                'orderProducts',
            ])
            ->where('id', $id)
            ->where('guest_id', $guest_id)
            ->status('draft', '!=')
            ->first();
    }
}
