<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class PlaceWithProductCategoriesResource extends JsonResource
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
            'descr_short' => $this->descr_short,
            'currency' => $this->currency,
            'placeCategory_name' => $this->placeCategory->name,
            'rating_avg' => $this->getJson('params', 'rating_avg', 0),
            'prices_from' => $this->getJson('params', 'prices_from', 0),
            'works_until' => $this->getJson('params', 'works_until', __('Круглосуточно')),
            'productCategories' => ProductCategoryResource::collection($this->productCategories),

            'table_id' => $this->relationLoaded('tables') ? optional($this->tables->first())->id : '',
            'table_name' => $this->relationLoaded('tables') ? optional($this->tables->first())->name : '',
        ];
    }
}
