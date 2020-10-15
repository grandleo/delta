<?php

namespace App\Listeners;

use App\Events\OrderStatusPaid;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\OrderStatusRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Events\OrderOrderStatusSet;

class OrderSetOrderStatusFirst
{
    private $orderRepository;
    private $placeRepository;
    private $orderStatusRepository;
    private $workerRepository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PlaceRepositoryInterface $placeRepository,
        OrderStatusRepositoryInterface $orderStatusRepository,
        WorkerRepositoryInterface $workerRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->placeRepository = $placeRepository;
        $this->orderStatusRepository = $orderStatusRepository;
        $this->workerRepository = $workerRepository;
    }

    /**
     * Handle the event.
     *
     * @param  OrderStatusPaid  $event
     * @return void
     */
    public function handle(OrderStatusPaid $event)
    {
        $order = $this->orderRepository->find($event->order_id);

        $place = $this->placeRepository->find($order->place_id);

        $orderStatuses = $this->orderStatusRepository->getByPlaceCategoryIdAndPlaceId($place->place_category_id, $place->id);

        $autoset_on_paid = $orderStatuses->filter(function($item) {
            return $item->getJson('params', 'autoset_on_paid', 0);
        });
        foreach ($autoset_on_paid as $orderStatus) {
            event(new OrderOrderStatusSet($event->order_id, $orderStatus));
        }

        // if exist active workers - set statuses
        $workers = $this->workerRepository->getByPlaceIdSorted($place->id, false);
        if ($workers->count()) {
            $autoset_on_workers_exist = $orderStatuses->filter(function($item) {
                return $item->getJson('params', 'autoset_on_workers_exist', 0);
            });
            foreach ($autoset_on_workers_exist as $orderStatus) {
                event(new OrderOrderStatusSet($event->order_id, $orderStatus));
            }
        }
    }
}
