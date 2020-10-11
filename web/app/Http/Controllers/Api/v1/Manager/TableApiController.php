<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\TableRepositoryInterface;
use App\Http\Resources\Manager\TableResource;

class TableApiController extends Controller
{
    private $placeRepository;
    private $tableRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        TableRepositoryInterface $tableRepository
    )
    {
        $this->placeRepository = $placeRepository;
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
        $place = $this->getPlace();

        $table = $this->tableRepository->find($id);
        abort_if(!$table || $table->place_id !== $place->id, 404);

        return new TableResource($table);
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
            'name' => 'required|string|min:2|max:250',
            'active' => 'required|numeric',
        ]);

        $isNew = $id == '0';

        $place = $this->getPlace($reqData['place_id']);

        if ($isNew) {
            $table = $this->tableRepository->create($reqData);

            $reqData_loc = ['active' => $reqData['active']];
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
