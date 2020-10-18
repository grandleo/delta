<?php

namespace App\Listeners;

use App\Events\OrderOrderStatusSet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\GuestRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\ManagerRepositoryInterface;

use App\Notifications\OrderOrderStatusNotification;

class OrderOrderStatusNotificationsCreate
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
    public function handle(OrderOrderStatusSet $event)
    {
        $order = $this->orderRepository->find($event->order_id);
        if (!$order) {
            return null;
        }

        $orderStatus = $event->orderStatus;
        $userable = $event->userable;

        // notify guest
        $guest = $this->guestRepository->find($order->guest_id);
        if ($guest && (!$userable || $userable->id !== $guest->id)) {
            $guest->notify(new OrderOrderStatusNotification($order->id, $orderStatus));
        }

        // notify workers
        $workers = $this->workerRepository->getByPlaceIdSorted($order->place_id);
        foreach ($workers as $worker) {
            $canSeeAll = $worker->getJson('params', 'orders_see_all', 0);
            if (
                $order->worker_id === $worker->id ||
                (!$order->worker_id &&
                    ($canSeeAll || ($order->table_id && in_array($order->table_id, $worker->tables->pluck('id')->toArray())))
                )
            ) {
                $worker->notify(new OrderOrderStatusNotification($order->id, $orderStatus));
            }
        }

        // notify manager
        $manager = $this->managerRepository->findByPlaceId($order->place_id);
        $manager && $manager->notify(new OrderOrderStatusNotification($order->id, $orderStatus));
    }
}
