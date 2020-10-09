<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Http\Resources\Manager\WorkerResource;

class WorkerApiController extends Controller
{
    private $placeRepository;
    private $workerRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        WorkerRepositoryInterface $workerRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->workerRepository = $workerRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $workers = $this->workerRepository->getByPlaceIdSorted($place->id, true);

        return WorkerResource::collection($workers);
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $place = $this->getPlace();

        $worker = $this->workerRepository->find($id);
        abort_if(!$worker || $worker->place_id !== $place->id, 404);

        return new WorkerResource($worker);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $isNew = $id == '0';

        $reqData = $request->validate([
            'place_id' => 'required',
            'name' => 'required|string|min:2|max:250',
            'name_full' => 'required|string|min:4|max:250',
            'image' => 'nullable|string|max:250',
            'phone' => 'nullable|string|max:250',
            'email' => ['required', 'string', 'email', 'max:250',
                Rule::unique('workers', 'email')->ignore($id)],
            'password' => [$isNew ? 'required' : 'nullable', 'string', 'min:8',
                'confirmed'],

            'card_number' => 'nullable|string',
            'orders_see_all' => 'required|numeric',

            'active' => 'required|numeric',
        ]);

        $place = $this->getPlace($reqData['place_id']);

        if (!empty($reqData['password'])) {
            $reqData['password'] = Hash::make($reqData['password']);
        } else {
            unset($reqData['password']);
        }

        $reqData['params']['card_number'] = $reqData['card_number'];
        $reqData['params']['orders_see_all'] = +$reqData['orders_see_all'];

        if ($isNew) {
            $worker = $this->workerRepository->create($reqData);

            $reqData_loc = ['active' => $reqData['active']];
            $this->workerRepository->updateFromForm($worker->id, $reqData_loc);
        } else {
            $worker = $this->workerRepository->find($id);
            abort_if(!$worker || $worker->place_id !== $place->id, 403);

            $this->workerRepository->updateFromForm($id, $reqData);
        }

        return response()->json([
            'success' => true,
            'alerts' => [[
                'type' => 'success',
                'message' => $isNew ? __('Официант создан') : __('Успешно сохранено'),
            ]],
            'workerId' => $worker->id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $place = $this->getPlace();

        $worker = $this->workerRepository->find($id);
        abort_if(!$worker || $worker->place_id !== $place->id, 403);

        $this->workerRepository->delete($id);

        return response()->json([
            'success' => true,
            'alerts' => [[
                'type' => 'info',
                'message' => __('Официант удалён'),
            ]],
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
