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
    public $userable_type;
    public $userable_id;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($order_id, $userable_type, $userable_id)
    {
        $this->order_id = $order_id;
        $this->userable_type = $userable_type;
        $this->userable_id = $userable_id;
    }
}
