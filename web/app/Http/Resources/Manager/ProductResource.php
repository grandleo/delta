<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'slug' => $this->slug,
            'image' => $this->image,
            'price' => $this->price,
            'descr_short' => $this->descr_short ?? '',
            'weight' => $this->getJson('params', 'weight', 0),
            'waiting_minutes' => $this->getJson('params', 'waiting_minutes', 15),
            'kcal' => $this->getJson('params', 'kcal', '') ?? '',
            'active' => +$this->hasStatus('active'),
        ];
    }
}
