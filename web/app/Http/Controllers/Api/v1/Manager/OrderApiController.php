<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\OrderRepositoryInterface;
use App\Http\Resources\Manager\OrderResource;

class OrderApiController extends Controller
{
    private $placeRepository;
    private $orderRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        OrderRepositoryInterface $orderRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->orderRepository = $orderRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $orders = $this->orderRepository->getByPlaceIdSorted($place->id);

        return OrderResource::collection($orders);
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
