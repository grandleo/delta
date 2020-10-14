<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'is_system' => $this->is_system,
            'is_owner' => !$this->is_system && $this->is_owner,
            'text' => $this->text,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
