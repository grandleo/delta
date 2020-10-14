<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
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
            'image' => $this->image,
            'descr_short' => $this->descr_short ?? '',
            'place_category_id' => $this->place_category_id,
            'params' => [
                'works_weekdays' => $this->getJson('params', 'works_weekdays', [1,1,1,1,1,1,1]),
                'works_from' => $this->getJson('params', 'works_from', '09:00'),
                'works_until' => $this->getJson('params', 'works_until', '20:00'),
                'worker_shifts' => $this->getJson('params', 'worker_shifts', []),
            ],
        ];
    }
}
