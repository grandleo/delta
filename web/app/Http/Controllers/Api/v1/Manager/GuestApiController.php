<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\GuestRepositoryInterface;
use App\Http\Resources\Manager\GuestResource;

class GuestApiController extends Controller
{
    private $placeRepository;
    private $guestRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        GuestRepositoryInterface $guestRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->guestRepository = $guestRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $guests = $this->guestRepository->getByPlaceIdSorted($place->id);

        return GuestResource::collection($guests);
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
