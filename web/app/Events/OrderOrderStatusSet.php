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
    public $orderStatus;
    public $userable;

    /**
     * Create a new event instance.
     *
     * @param $order_id
     * @param $orderStatus
     * @param $userable
     * @return void
     */
    public function __construct($order_id, $orderStatus, $userable = null)
    {
        $this->order_id = $order_id;
        $this->orderStatus = $orderStatus;
        $this->userable = $userable;
    }
}
