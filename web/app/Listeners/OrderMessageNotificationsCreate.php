<?php

namespace App\Listeners;

use App\Events\OrderMessageSend;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\GuestRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\ManagerRepositoryInterface;

use App\Notifications\OrderMessageNotification;

class OrderMessageNotificationsCreate
{
    private $orderRepository;
    private $guestRepository;
    private $workerRepository;
    private $managerRepository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        GuestRepositoryInterface $guestRepository,
        WorkerRepositoryInterface $workerRepository,
        ManagerRepositoryInterface $managerRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->guestRepository = $guestRepository;
        $this->workerRepository = $workerRepository;
        $this->managerRepository = $managerRepository;
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

        // notify guest
        if ($order->guest_id !== $message->userable_id) {
            $guest = $this->guestRepository->find($order->guest_id);
            $guest && $guest->notify(new OrderMessageNotification($message));
        }

        // notify worker
        if ($order->worker_id !== $message->userable_id) {
            $worker = $this->workerRepository->find($order->worker_id);
            $worker && $worker->notify(new OrderMessageNotification($message));
        }

        // notify manager
        $manager = $this->managerRepository->findByPlaceId($order->place_id);
        if ($manager && $manager->id !== $message->userable_id) {
            $manager->notify(new OrderMessageNotification($message));
        }
    }
}
