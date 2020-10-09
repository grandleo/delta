<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'currency' => $this->currency,
            'amount' => $this->amount,
            'created_at' => $this->created_at->toDateTimeString(),
            'guest_name' => $this->guest->name_full,
            'table_name' => optional($this->table)->name ?? 'Стол ?',
            'worker_name' => optional($this->worker)->name_full ?? '---',
        ];
    }
}
