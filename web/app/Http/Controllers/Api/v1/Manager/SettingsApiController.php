<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\PlaceCategoryRepositoryInterface;
use App\Repositories\ManagerRepositoryInterface;
use App\Http\Resources\Manager\PlaceResource;
use App\Http\Resources\Manager\PlaceCategoryResource;

class SettingsApiController extends Controller
{
    private $placeRepository;
    private $placeCategoryRepository;
    private $managerRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        PlaceCategoryRepositoryInterface $placeCategoryRepository,
        ManagerRepositoryInterface $managerRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->placeCategoryRepository = $placeCategoryRepository;
        $this->managerRepository = $managerRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $place = $this->placeRepository->find($id);
        abort_if(!$place || $place->manager_id !== \Auth::id(), 404);

        $placeCategories = $this->placeCategoryRepository->getAllSorted();

        return (new PlaceResource($place))
            ->additional([
                'form' => [
                    'placeCategories' => PlaceCategoryResource::collection($placeCategories),
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
        $manager_id = \Auth::id();
        $reqData_place = $request->validate([
            'name' => 'required|string|min:3|max:250',
            'descr_short' => 'nullable|string|min:4|max:250',
            'place_category_id' => 'required|exists:place_categories,id',
            'image' => 'nullable|string|max:250',
            'params' => 'required|array',
            'params.works_weekdays' => 'required|array',
            'params.works_from' => 'required|string',
            'params.works_until' => 'required|string',
        ]);
        $reqData_user = $request->validate([
            'user' => 'required|array',
            'user.name_full' => 'required|string|min:4|max:250',
            'user.email' => ['required', 'string', 'email', 'max:250',
                Rule::unique('managers', 'email')->ignore($manager_id),
                Rule::unique('workers', 'email'),
            ],
            'user.password' => 'nullable|string|min:8|confirmed',
        ]);

        $place = $this->placeRepository->find($id);
        abort_if(!$place || $place->manager_id !== $manager_id, 404);

        $reqData_place['slug'] = $this->placeRepository->getFreeSlug($reqData_place['name'], $id);

        $this->placeRepository->updateFromForm($id, $reqData_place);

        $this->managerRepository->updateFromForm($manager_id, $reqData_user['user']);

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'success',
                'message' => __('Данные обновлены'),
            ]],
        ]);
    }
}
