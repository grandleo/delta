<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductShortResource extends JsonResource
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
            'image' => $this->image ?? 'test/130.png',
            'price' => $this->price,
            'descr_short' => $this->descr_short,
            'weight' => $this->getJson('params', 'weight', 0),
        ];
    }
}
