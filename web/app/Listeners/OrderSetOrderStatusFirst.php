<?php

namespace App\Listeners;

use App\Events\OrderStatusPaid;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\OrderStatusRepositoryInterface;
use App\Events\OrderOrderStatusSet;

class OrderSetOrderStatusFirst
{
    private $orderRepository;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PlaceRepositoryInterface $placeRepository,
        OrderStatusRepositoryInterface $orderStatusRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->placeRepository = $placeRepository;
        $this->orderStatusRepository = $orderStatusRepository;
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

        foreach ($autoset_on_paid as $order_status) {
            event(new OrderOrderStatusSet($event->order_id, $order_status));
        }

        $order_status_id = $autoset_on_paid->last()->id;

        $reqData_loc = [
            'order_status_id' => $order_status_id,
            'order_status_at' => now(),

            'orderStatuses' => $autoset_on_paid->pluck('id')->toArray(),
        ];
        $this->orderRepository->updateFromForm($order->id, $reqData_loc);
    }
}
