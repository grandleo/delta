<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class GuestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_full' => $this->name_full,
            'image' => $this->image,
            'orders_last_at' => $this->orders_last_at->toDateTimeString(),
            'orders_amount_avg' => $this->orders_amount_avg,
            'orders_count' => $this->orders_count,
            'orders_amount_sum' => $this->orders_amount_sum,
        ];
    }
}
