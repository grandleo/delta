<?php

namespace App\Listeners;

use App\Events\OrderOrderStatusSet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Events\OrderMessageSend;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\OrderStatusRepositoryInterface;

class OrderSetOrderStatusAny
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
     * @param  OrderOrderStatusSet  $event
     * @return void
     */
    public function handle(OrderOrderStatusSet $event)
    {
        $order = $this->orderRepository->find($event->order_id);
        if (!$order) {
            //
        }

        $orderStatus = $event->orderStatus;
        $userable = $event->userable;

        if ($userable) {
            $orderStatuses_ids = [$orderStatus->id => [
                'userable_id' => $userable->id,
                'userable_type' => get_class($userable),
            ]];
        } else {
            $orderStatuses_ids = [$orderStatus->id];
        }

        $reqData_loc = [
            'order_status_id' => $orderStatus->id,
            'order_status_at' => now(),

            'orderStatuses' => $orderStatuses_ids,
        ];
        $this->orderRepository->updateFromForm($order->id, $reqData_loc);

        // params-based actions
        $message_template = $orderStatus->getJson('params', 'message_template', '');

        if ($message_template) {
            $text = str_replace(['{order_id}'], [$order->id], $message_template);
            $reqData = [
                'text' => $text,
            ];
            $message = $this->orderRepository->messageCreate($order->id, $reqData);
            event(new OrderMessageSend($message));
        }
    }
}
