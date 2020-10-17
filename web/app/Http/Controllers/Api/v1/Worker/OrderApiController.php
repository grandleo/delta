<?php

namespace App\Http\Controllers\Api\v1\Worker;

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
use App\Http\Resources\Worker\OrderResource;
use App\Http\Resources\Worker\OrderStatusPhaseResource;
use App\Http\Resources\Worker\OrderStatusResource;

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $reqData = $request->validate([
            'date' => 'nullable|date',
        ]);

        $worker = \Auth::user();

        $place = $this->getPlace();

        $orderStatusPhases = $this->orderStatusPhaseRepository->getByPlaceCategoryId(null);

        $conditions = [
            ['created_at', 'like', $reqData['date'].'%'],
        ];
        $canSeeAll = $worker->getJson('params', 'orders_see_all', 0);
        $orders = $this->orderRepository->getByPlaceIdSorted($place->id, $worker->id, $canSeeAll, $conditions);

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
        $worker = \Auth::user();

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
    public function takeOrder(Request $request, $id)
    {
        $worker = \Auth::user();

        $place = $this->getPlace();

        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        if ($order->worker_id) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => [__('Этот заказ уже взял ').$order->worker->name_full],
            ]);
        }

        $orderStatuses = $this->orderStatusRepository->getByPlaceCategoryIdAndPlaceId($place->place_category_id, $place->id);

        $autoset_on_worker_set = $orderStatuses->filter(function($item) {
            return $item->getJson('params', 'autoset_on_worker_set', 0);
        });

        foreach ($autoset_on_worker_set as $order_status) {
            event(new OrderOrderStatusSet($order->id, $order_status, $worker));
        }

        $reqData_loc = [
            'worker_id' => $worker->id,
        ];
        $this->orderRepository->updateFromForm($order->id, $reqData_loc);

        return response()->json([
            'status' => 'success',
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

        $worker = \Auth::user();

        $place = $this->getPlace();

        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $orderStatus = $this->orderStatusRepository->find($order_status_id);
        abort_if(!$orderStatus, 404);

        event(new OrderOrderStatusSet($order->id, $orderStatus, $worker));

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

        $worker = \Auth::user();
        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $reqData['userable_id'] = $worker->id;
        $reqData['userable_type'] = get_class($worker);

        $message = $this->orderRepository->messageCreate($order->id, $reqData);

        event(new OrderMessageSend($message));

        return response()->json([
            'status' => 'success',
        ]);
    }


    private function getPlace($place_id = null)
    {
        $worker = \Auth::user();
        $place = $this->placeRepository->find($worker->place_id);
        abort_if(!$place, 404);

        return $place;
    }
}
