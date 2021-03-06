<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\TableRepositoryInterface;
use App\Http\Resources\Manager\WorkerShortResource;
use App\Http\Resources\Manager\TableResource;

class TableApiController extends Controller
{
    private $placeRepository;
    private $workerRepository;
    private $tableRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        WorkerRepositoryInterface $workerRepository,
        TableRepositoryInterface $tableRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->workerRepository = $workerRepository;
        $this->tableRepository = $tableRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $tables = $this->tableRepository->getByPlaceIdSorted($place->id, true);

        return TableResource::collection($tables);
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $isNew = $id == '0';

        $place = $this->getPlace();

        $workers = $this->workerRepository->getByPlaceIdSorted($place->id, true);

        if ($isNew) {
            return response()->json([
                'data' => null,
                'form' => [
                    'workers' => WorkerShortResource::collection($workers),
                ],
            ]);
        }

        $table = $this->tableRepository->find($id, ['workers']);
        abort_if(!$table || $table->place_id !== $place->id, 404);

        return (new TableResource($table))
            ->additional([
                'form' => [
                    'workers' => WorkerShortResource::collection($workers)
                ],
            ]);
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
        $reqData = $request->validate([
            'place_id' => 'required',
            'marker_code' => 'nullable|string|min:1|max:10',
            'name' => 'required|string|min:2|max:250',

            'active' => 'required|numeric',

            'workers' => 'present|array',
            'workers.*' => 'required|numeric',
        ]);

        $tableWithSameCode = $this->tableRepository->findByWhere([
            ['id', '!=', $id],
            ['marker_code', '=', $reqData['marker_code']],
        ]);
        if ($tableWithSameCode) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'marker_code' => [__('Данный код уже используется.')],
            ]);
        }

        $isNew = $id == '0';

        $place = $this->getPlace($reqData['place_id']);

        if ($isNew) {
            $table = $this->tableRepository->create($reqData);

            $reqData_loc = [
                'active' => $reqData['active'],
                'workers' => $reqData['workers'],
            ];
            $this->tableRepository->updateFromForm($table->id, $reqData_loc);
        } else {
            $table = $this->tableRepository->find($id);
            abort_if(!$table || $table->place_id !== $place->id, 403);

            $this->tableRepository->updateFromForm($id, $reqData);
        }

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'success',
                'message' => $isNew ? __('Стол создан') : __('Успешно сохранено'),
            ]],
            'tableId' => $table->id,
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

        $table = $this->tableRepository->find($id);
        abort_if(!$table || $table->place_id !== $place->id, 403);

        $this->tableRepository->delete($id);

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'info',
                'message' => __('Стол удалён'),
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
