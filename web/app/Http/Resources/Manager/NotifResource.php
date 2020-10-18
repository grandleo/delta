<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class NotifResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $arr = [
            'id' => $this->id,
            'type' => $this->type,
            'created_at' => $this->created_at->toDateTimeString(),
            'read_at' => +($this->read_at !== null),
        ];
        return array_merge($arr, $this->data);
    }
}
