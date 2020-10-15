<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderStatusPhaseRepositoryInterface;
use App\Repositories\OrderStatusRepositoryInterface;
use App\Events\OrderOrderStatusSet;
use App\Events\OrderMessageSend;
use App\Http\Resources\Manager\OrderResource;
use App\Http\Resources\Manager\OrderStatusPhaseResource;
use App\Http\Resources\Manager\OrderStatusResource;

class OrderApiController extends Controller
{
    private $placeRepository;
    private $orderRepository;
    private $orderStatusPhaseRepository;
    private $orderStatusRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        OrderRepositoryInterface $orderRepository,
        OrderStatusPhaseRepositoryInterface $orderStatusPhaseRepository,
        OrderStatusRepositoryInterface $orderStatusRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->orderRepository = $orderRepository;
        $this->orderStatusPhaseRepository = $orderStatusPhaseRepository;
        $this->orderStatusRepository = $orderStatusRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $orderStatusPhases = $this->orderStatusPhaseRepository->getByPlaceCategoryId(null);

        $orders = $this->orderRepository->getByPlaceIdSorted($place->id);

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
        $manager = \Auth::user();

        $place = $this->getPlace();

        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $orderStatuses = $this->orderStatusRepository->getByPlaceCategoryIdAndPlaceId($place->place_category_id, $place->id);

        $orderOrderStatuses = $this->orderRepository->getOrderOrderStatuses($order->id);

        $orderOrderStatuses_ids = $orderOrderStatuses->pluck('id')->toArray();
        $orderOrderStatuses_max_sort = $orderOrderStatuses->max('sort');

        $orderStatuses = $orderStatuses->filter(function($value) use ($orderOrderStatuses_ids, $orderOrderStatuses_max_sort) {
            return !in_array($value->id, $orderOrderStatuses_ids) && $value->sort > $orderOrderStatuses_max_sort;
        });

        return (new OrderResource($order))
            ->additional([
                'form' => [
                    'orderStatuses' => OrderStatusResource::collection($orderStatuses),
                ],
            ]);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function setOrderStatus(Request $request, $id)
    {
        $reqData = $request->validate([
            'order_status_id' => 'required|numeric',
        ]);

        $order_status_id = $reqData['order_status_id'];

        $manager = \Auth::user();

        $place = $this->getPlace();

        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $orderStatus = $this->orderStatusRepository->find($order_status_id);
        abort_if(!$orderStatus, 404);

        event(new OrderOrderStatusSet($order->id, $orderStatus, $manager));

        return response()->json([
            'status' => 'success',
        ]);
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

        $manager = \Auth::user();
        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $reqData['userable_id'] = $manager->id;
        $reqData['userable_type'] = get_class($manager);

        $message = $this->orderRepository->messageCreate($order->id, $reqData);

        event(new OrderMessageSend($message));

        return response()->json([
            'status' => 'success',
        ]);
    }


    private function getPlace($place_id = null)
    {
        $place = $place_id
            ? $this->placeRepository->find($place_id)
            : $this->placeRepository->findByWhere([['manager_id', '=', \Auth::id()]]);
        abort_if(!$place || $place->manager_id !== \Auth::id(), 404);

        return $place;
    }
}
