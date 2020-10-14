<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderProductRepositoryInterface;
use App\Repositories\OrderStatusPhaseRepositoryInterface;
use App\Http\Resources\Guest\OrderResource;
use App\Http\Resources\Guest\OrderStatusPhaseResource;

class OrderApiController extends Controller
{
    private $orderRepository;
    private $orderProductRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        OrderProductRepositoryInterface $orderProductRepository,
        OrderStatusPhaseRepositoryInterface $orderStatusPhaseRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->orderProductRepository = $orderProductRepository;
        $this->orderStatusPhaseRepository = $orderStatusPhaseRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $guest_id = \Auth::id();

        $orderStatusPhases = $this->orderStatusPhaseRepository->getByPlaceCategoryId(null);

        $orders = $this->orderRepository->getByGuestId($guest_id);

        foreach ($orders as $order) {
            $orStPh = $orderStatusPhases->firstWhere('id', optional($order->orderStatus)->order_status_phase_id);
            !$orStPh && ($orStPh = $orderStatusPhases->first()) && ($order->orderStatus_phase_id = $orStPh->id);
            $orStPh->orders_count = ($orStPh->orders_count ?? 0) + 1;
        }

        return OrderResource::collection($orders)
            ->additional([
                'orderStatusPhases' => OrderStatusPhaseResource::collection($orderStatusPhases),
            ]);
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

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function storeMessage(Request $request, $id)
    {
        $reqData = $request->validate([
            'text' => 'required|string|min:1|max:250',
        ]);

        $guest = \Auth::user();
        $order = $this->orderRepository->findByIdAndGuestId($id, $guest->id);
        abort_if(!$order, 404);

        $reqData['userable_id'] = $guest->id;
        $reqData['userable_type'] = get_class($guest);

        $this->orderRepository->messageCreate($order->id, $reqData);

        return response()->json([
            'status' => 'success',
        ]);
    }
}
