<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PlaceRepositoryInterface;
use Illuminate\Http\Request;
use App\Repositories\TableRepositoryInterface;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    private $tableRepository;
    private $placeRepository;

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
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'place_id'    => 'required',
            'marker_code' => 'nullable|string|min:1|max:10',
            'name'        => 'required|string|min:2|max:250',

            'active' => 'required|numeric',

            'workers'   => 'present|array',
            'workers.*' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $reqData = $request->all();

        $tableWithSameCode = $this->tableRepository->findByWhere([
            ['id', '!=', $reqData['table_id']],
            ['marker_code', '=', $reqData['marker_code']],
        ]);
        if ($tableWithSameCode) {
            return response()->json([
                'marker_code' => [__('Данный код уже используется.')],
            ], 400);
        }

        $isNew = $reqData['table_id'] == '0';

        $place = $this->getPlace($reqData['place_id']);

        if ($isNew) {
            $table = $this->tableRepository->create($reqData);

            $reqData_loc = [
                'active' => $reqData['active'],
                'workers' => $reqData['workers'],
            ];
            $this->tableRepository->updateFromForm($table->id, $reqData_loc);
        } else {
            $table = $this->tableRepository->find($reqData['table_id']);
            if (!$table || $table->place_id !== $place->id)
            return response()->json([
                'status' => 'success',
                'error' => 'Server Error!',
            ], 403);

            $this->tableRepository->updateFromForm($reqData['table_id'], $reqData);
        }

        return response()->json([
            'status' => 'success',
            'message' => $isNew ? __('Стол создан') : __('Успешно сохранено'),
            'table' => $table->load('workers')
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $table = $this->tableRepository->findWithTrashed($id);
        if (!$table) {
            return response()->json([
                'status' => 'error',
                'message' => __('Стол не найден'),
            ],400);
        }

        $this->tableRepository->destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => __('Стол удалён'),
        ]);
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id)
    {
        $table = $this->tableRepository->findWithTrashed($id);
        if (!$table) {
            return response()->json([
                'status' => 'success',
                'message' => __('Стол не найден'),
            ], 404);
        }

        $table->restore();

        return response()->json([
            'status' => 'success',
            'message' => __('Стол восстановлен'),
        ]);
    }

    private function getPlace($place_id = null)
    {
        return $this->placeRepository->find($place_id);
    }
}
