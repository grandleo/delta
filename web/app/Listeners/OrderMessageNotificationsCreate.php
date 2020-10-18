<?php

namespace App\Listeners;

use App\Events\OrderMessageSend;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\GuestRepositoryInterface;

use App\Notifications\OrderMessageNotification;

class OrderMessageNotificationsCreate
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
    public function handle(OrderMessageSend $event)
    {
        $message = $event->message;

        if (!$message->userable_id) {
            return null; // do not notify if system message
        }

        $order = $this->orderRepository->find($message->messageable_id);
        if (!$order) {
            return null;
        }

        // notify to guest
        if ($order->guest_id !== $message->userable_id) {
            $guest = $this->guestRepository->find($order->guest_id);
            $guest->notify(new OrderMessageNotification($message));
        }
    }
}
