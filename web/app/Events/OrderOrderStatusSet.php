<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderOrderStatusSet
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order_id;
    public $order_status;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($order_id, $order_status)
    {
        $this->order_id = $order_id;
        $this->order_status = $order_status;
    }
}
