<?php

namespace App\Listeners;

use App\Events\OrderOrderStatusSet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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

        $order_status = $event->order_status;

        $message_template = $order_status->getJson('params', 'message_template', '');

        if ($message_template) {
            $text = str_replace(['{order_id}'], [$order->id], $message_template);
            $reqData = [
                'text' => $text,
            ];
            $this->orderRepository->messageCreate($order->id, $reqData);
        }
    }
}
