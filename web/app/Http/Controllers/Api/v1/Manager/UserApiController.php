<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ManagerRepositoryInterface;
use App\Repositories\PlaceRepositoryInterface;
use App\Http\Resources\Manager\ManagerResource;

class UserApiController extends Controller
{
    private $managerRepository;
    private $placeRepository;

    public function __construct(
        ManagerRepositoryInterface $managerRepository,
        PlaceRepositoryInterface $placeRepository
    )
    {
        $this->managerRepository = $managerRepository;
        $this->placeRepository = $placeRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $manager_id = \Auth::id();

        $manager = $this->managerRepository->find($manager_id);
        abort_if(!$manager, 404);

        $manager->place = $this->placeRepository->findByWhere([['manager_id', '=', $manager_id]]);

        return new ManagerResource($manager);
    }
}
