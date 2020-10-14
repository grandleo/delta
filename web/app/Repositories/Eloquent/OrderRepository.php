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
                'orderStatus',
            ])
            ->withCount([
                'messages',
            ])
            ->where('guest_id', $guest_id)
            ->status('draft', '!=')
            ->orderByDesc('id')
            ->get();
    }

    /**
    * @param $place_id
    * @param $worker_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id, $worker_id = null, $all = false): Collection
    {
        $query = $this->model
            ->with([
                'table',
                'guest',
                'worker',
            ])
            ->where('place_id', $place_id)
            ->status('draft', '!=')
            ->orderByDesc('id');

        if ($worker_id && !$all) {
            $query->whereHas('table', function ($query1) use ($worker_id) {
                $query1->whereHas('workers', function ($query2) use ($worker_id) {
                    $query2->where('id', $worker_id);
                });
            });
        }

        return $query->get();
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
                'orderStatus',
                'messages',
            ])
            ->where('id', $id)
            ->where('guest_id', $guest_id)
            ->status('draft', '!=')
            ->first();
    }

    /**
    * @param $id
    * @param array $attributes
    * @return Order
    */
    public function updateFromForm($id, array $attributes): ?Order
    {
        $model = $this->find($id);

        $model->fill($attributes);

        if (isset($attributes['status'])) {
            $model->setStatus($attributes['status']);
        }

        if (!empty($attributes['params'])) {
            foreach ($attributes['params'] as $key => $value) {
                $model->setJson('params', $key, $value);
            }
        }

        if (!empty($attributes['orderStatuses'])) {
            $model->orderStatuses()->attach($attributes['orderStatuses']);
        }

        $model->save();

        return $model;
    }

    /**
    * @param $id
    * @param array $attributes
    * @return bool
    */
    public function messageCreate($id, array $attributes): bool
    {
        $model = $this->find($id);

        $model->messages()->create($attributes);

        return true;
    }

    /**
    * @param $id
    * @return Collection
    */
    public function getOrderOrderStatuses($id): Collection
    {
        $model = $this->find($id);

        return $model->orderStatuses()->get();;
    }
}
