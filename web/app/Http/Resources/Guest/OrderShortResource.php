<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderShortResource extends JsonResource
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
            'guest_id' => $this->guest_id,
            'place_id' => $this->place_id,
            'table_id' => $this->table_id,
            'worker_id' => $this->worker_id,
            'status' => $this->status,
            'currency' => $this->currency,
            'amount' => $this->amount,
        ];
    }
}
