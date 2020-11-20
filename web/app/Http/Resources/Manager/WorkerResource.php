<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkerResource extends JsonResource
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
            'email' => $this->email,
            'deleted_at' => $this->deleted_at,
            'phone' => $this->phone ?? '',
            'active' => +$this->hasStatus('active'),
            'card_number' => $this->getJson('params', 'card_number', ''),
            'orders_see_all' => $this->getJson('params', 'orders_see_all', 0),
            'shift_key' => $this->getJson('params', 'shift_key', ''),
            'tables' => TableShortResource::collection($this->tables),
        ];
    }
}
