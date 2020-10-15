<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusPaid
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order_id;

    /**
     * Create a new event instance.
     *
     * @param $order_id
     * @return void
     */
    public function __construct($order_id)
    {
        $this->order_id = $order_id;
    }
}
