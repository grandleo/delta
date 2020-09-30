<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderProductRepositoryInterface;
use App\Http\Resources\Guest\OrderResource;

class OrderApiController extends Controller
{
    private $orderRepository;
    private $orderProductRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        OrderProductRepositoryInterface $orderProductRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->orderProductRepository = $orderProductRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $guest_id = \Auth::id();
        $orders = $this->orderRepository->getByGuestId($guest_id);

        return OrderResource::collection($orders);
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $guest_id = \Auth::id();
        $order = $this->orderRepository->findByIdAndGuestId($id, $guest_id);
        abort_if(!$order, 404);

        return new OrderResource($order);
    }
}
