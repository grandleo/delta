<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource
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
            'marker_code' => $this->marker_code ?? '',
            'name' => $this->name,
            'deleted_at' => $this->deleted_at,
            'active' => +$this->hasStatus('active'),
            'workers' => WorkerShortResource::collection($this->workers),
        ];
    }
}
