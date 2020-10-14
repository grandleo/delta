<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class ManagerResource extends JsonResource
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
            'name_full' => $this->name_full,
            'image' => $this->image,
            'email' => $this->email,
            'token' => $this->token,
            'place' => [
                'id' => $this->place->id,
                'name' => $this->place->name,
                'slug' => $this->place->slug,
                'currency' => $this->place->currency,
                'worker_shifts' => $this->place->getJson('params', 'worker_shifts', []),
            ],
        ];
    }
}
