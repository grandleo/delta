<?php

namespace App\Listeners;

use App\Events\OrderOrderStatusSet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\GuestRepositoryInterface;

use App\Notifications\OrderOrderStatusNotification;

class OrderOrderStatusNotificationsCreate
{
    private $orderRepository;
    private $guestRepository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        GuestRepositoryInterface $guestRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->guestRepository = $guestRepository;
    }

    /**
     * Handle the event.
     *
     * @param  OrderMessageSend  $event
     * @return void
     */
    public function handle(OrderOrderStatusSet $event)
    {
        $order = $this->orderRepository->find($event->order_id);
        if (!$order) {
            return null;
        }

        $orderStatus = $event->orderStatus;

        // notify to guest
        $guest = $this->guestRepository->find($order->guest_id);
        $guest->notify(new OrderOrderStatusNotification($order->id, $orderStatus));
    }
}
