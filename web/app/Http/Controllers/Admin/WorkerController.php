<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PlaceRepositoryInterface;
use Illuminate\Http\Request;
use App\Repositories\WorkerRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Storage;
use Str;
use Image;

class WorkerController extends Controller
{
    private $workerRepository;
    private $placeRepository;

    public function __construct(
        WorkerRepositoryInterface $workerRepository,
        PlaceRepositoryInterface $placeRepository
    )
    {
        $this->workerRepository = $workerRepository;
        $this->placeRepository = $placeRepository;
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
     * @param         $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $id = $request->worker_id;
        $isNew = $request->worker_id == '0';
        $reqData = $request->validate([
            'place_id' => 'required',
            'name' => 'required|string|min:2|max:250',
            'name_full' => 'required|string|min:4|max:250',
            'image' => 'nullable|image|max:20000|mimes:jpeg,jpg,gif,bmp,png',

            'phone' => 'nullable|string|max:250',
            'email' => ['required', 'string', 'email', 'max:250',
                        Rule::unique('workers', 'email')->ignore($id),
                        'unique:managers',
            ],
            'password' => [$isNew ? 'required' : 'nullable', 'string', 'min:8',
                           'confirmed'],

            'card_number' => 'nullable|string',
            'orders_see_all' => 'required|numeric',
            'shift_key' => 'nullable|numeric',

            'active' => 'required|numeric',
        ]);

        $file = $request->file('image');
        if ($file) {
            $fileName = time();

            $path = 'places/'.$request->place_id;
            Storage::disk('public')->makeDirectory($path);
            $img = Image::make($file);

            $fileName = 'wk-'.$fileName;
            $img->fit(120);

            $img->save('storage/'.$path.'/'.$fileName.'.jpg');
            $reqData['image'] = $path.'/'.$fileName.'.jpg';
        }

        $place = $this->getPlace($reqData['place_id']);

        if (!empty($reqData['password'])) {
            $reqData['password'] = Hash::make($reqData['password']);
        } else {
            unset($reqData['password']);
        }

        $reqData['params']['card_number'] = $reqData['card_number'] ?? '';
        $reqData['params']['orders_see_all'] = +$reqData['orders_see_all'];
        $reqData['params']['shift_key'] = +$reqData['shift_key'] ?? null;

        if ($isNew) {
            $worker = $this->workerRepository->create($reqData);

            $reqData_loc = [
                'params' => $reqData['params'],
                'active' => $reqData['active'],
            ];
            $worker = $this->workerRepository->updateFromForm($worker->id, $reqData_loc);
        } else {
            $worker = $this->workerRepository->find($id);
            abort_if(!$worker || $worker->place_id !== $place->id, 403);

            $worker = $this->workerRepository->updateFromForm($id, $reqData);
        }
        $worker['worker_shift'] = $worker->worker_shift();

        return response()->json([
            'status' => 'success',
            'message' => $isNew ? __('Официант создан') : __('Успешно сохранено'),
            'worker' => $worker,
        ]);
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $worker = $this->workerRepository->find($id);
        $worker['worker_shift'] = $worker->worker_shift();
        if (!$worker) {
            return response()->json([
                'status' => 'error',
                'message' => __('Официант не найден'),
            ],400);
        }
        return response()->json([
            'status' => 'error',
            'worker' => $worker,
        ],200);
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
     * @param Request $request
     * @param         $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $worker = $this->workerRepository->findWithTrashed($id);
        $worker['worker_shift'] = $worker->worker_shift();
        if (!$worker) {
            return response()->json([
                'status' => 'error',
                'message' => __('Официант не найден'),
            ], 404);
        }

        $this->workerRepository->destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => __('Официант удалён'),
            'worker' => $worker
        ]);
    }

    public function restore($id)
    {
        $worker = $this->workerRepository->findWithTrashed($id);
        if (!$worker) {
            return response()->json([
                'status' => 'error',
                'message' => __('Официант не найден'),
            ], 404);
        }

        $worker->restore();

        $worker['worker_shift'] = $worker->worker_shift();

        return response()->json([
            'status' => 'success',
            'message' => __('Официант восстановлен'),
            'worker' => $worker
        ]);
    }

    private function getPlace($place_id = null)
    {
        $place = $this->placeRepository->find($place_id);
        if (!$place) {
            return response()->json([
                'status' => 'error',
                'message' => 'not found',
            ], 404);
        }

        return $place;
    }
}
