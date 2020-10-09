<?php

namespace App\Repositories\Eloquent;

use App\Repositories\GuestRepositoryInterface;

use App\Models\Guest;
use Illuminate\Support\Collection;

class GuestRepository extends BaseRepository implements GuestRepositoryInterface
{
    /**
    * @param Guest $model
    */
    public function __construct(Guest $model)
    {
        parent::__construct($model);
    }

    /**
    * @param $place_id
    * @return Collection
    */
    public function getByPlaceIdSorted($place_id): Collection
    {
        $query = $this->model
            ->withCount([
                'orders' => function ($query1) use ($place_id) {
                    $query1->status('draft', '!=');
                    $query1->where('place_id', $place_id);
                },
            ])
            ->whereHas('orders', function ($query1) use ($place_id) {
                $query1->status('draft', '!=');
                $query1->where('place_id', $place_id);
            })
            ->orderByDesc('id');

        $models = $query->get();

        foreach ($models as $key => $value) {
            $query1 = $value->orders()->where('place_id', $place_id)->status('draft', '!=');
            $value->orders_last_at = $query1->orderByDesc('id')->first()->created_at;
            $value->orders_amount_avg = $query1->avg('amount');
            $value->orders_amount_sum = $query1->sum('amount');
        }

        return $models;
    }
}
