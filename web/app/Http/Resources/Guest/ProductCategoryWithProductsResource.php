<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryWithProductsResource extends JsonResource
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
            'image' => $this->image ?? '/storage/test/130.png',
            'descr_short' => $this->descr_short,
            'count' => $this->products->count(),
            'products' => ProductResource::collection($this->products),
        ];
    }
}
