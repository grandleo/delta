<?php

namespace App\Http\Resources\Guest;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'guest_id' => $this->guest_id,
            'place_id' => $this->place_id,
            'table_id' => $this->table_id,
            'worker_id' => $this->worker_id,
            'status' => $this->status,
            'currency' => $this->currency,
            'amount' => $this->amount,
            'created_at' => $this->created_at->toDateTimeString(),
            'placeCategory_name' => $this->place->placeCategory->name,
            'place_name' => $this->place->name,
            'place_slug' => $this->place->slug,
            'table_name' => optional($this->table)->name,
            'worker_name' => optional($this->worker)->name,
            'worker_image' => optional($this->worker)->image ?? 'test/user-male.png',
            'orderStatus_phase_id' => optional($this->orderStatus)->order_status_phase_id ?? $this->orderStatus_phase_id,
            'orderStatus_name' => optional($this->orderStatus)->name,
            'orderStatus_color' => optional($this->orderStatus)->color,
            'orderProducts' => OrderProductResource::collection($this->orderProducts),
            'messages_count' => isset($this->messages_count) ? $this->messages_count : $this->messages->count(),
            'messages' => $this->relationLoaded('messages') ? MessageResource::collection($this->messages) : [],
        ];
    }
}
