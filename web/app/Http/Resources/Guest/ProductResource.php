<?php

namespace App\Http\Resources\Guest;

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
            'image' => $this->image ?? 'test/130.png',
            'price' => $this->price,
            'descr_short' => $this->descr_short,
            'kcal' => $this->getJson('params', 'kcal', '?') ?? '?',
            'weight' => $this->getJson('params', 'weight', 0),
            'waiting_minutes' => $this->getJson('params', 'waiting_minutes', '?'),

            'productCategory_id' => $this->product_category_id,
            'productCategory_name' => isset($this->productCategory) ? optional($this->productCategory)->name : '',
            'productCategory_slug' => isset($this->productCategory) ? optional($this->productCategory)->slug : '',
        ];
    }
}
