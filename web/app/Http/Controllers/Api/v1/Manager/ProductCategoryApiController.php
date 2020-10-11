<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductCategoryRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Http\Resources\Manager\ProductCategoryResource;

class ProductCategoryApiController extends Controller
{
    private $placeRepository;
    private $productCategoryRepository;
    private $productRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        ProductCategoryRepositoryInterface $productCategoryRepository,
        ProductRepositoryInterface $productRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->productCategoryRepository = $productCategoryRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $place = $this->getPlace();

        $productCategories = $this->productCategoryRepository->getByPlaceIdSorted($place->id, true);

        return ProductCategoryResource::collection($productCategories);
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

        $productCategory = $this->productCategoryRepository->find($id);
        abort_if(!$productCategory || $productCategory->place_id !== $place->id, 404);

        return new ProductCategoryResource($productCategory);
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
            'descr_short' => 'nullable|string|min:4|max:250',
            'image' => 'nullable|string|max:250',
            'active' => 'required|numeric',
        ]);

        $isNew = $id == '0';

        $place = $this->getPlace($reqData['place_id']);

        if ($isNew) {
            $reqData['slug'] = \Str::slug($reqData['name']);
            $productCategory = $this->productCategoryRepository->create($reqData);

            $reqData_loc = ['active' => $reqData['active']];
            $this->productCategoryRepository->updateFromForm($productCategory->id, $reqData_loc);
        } else {
            $productCategory = $this->productCategoryRepository->find($id);
            abort_if(!$productCategory || $productCategory->place_id !== $place->id, 403);

            $this->productCategoryRepository->updateFromForm($id, $reqData);
        }

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'success',
                'message' => $isNew ? __('Категория создана') : __('Успешно сохранено'),
            ]],
            'productCategoryId' => $productCategory->id,
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

        $productCategory = $this->productCategoryRepository->find($id);
        abort_if(!$productCategory || $productCategory->place_id !== $place->id, 403);

        $this->productCategoryRepository->delete($id);

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'info',
                'message' => __('Категория удалена'),
            ]],
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resort(Request $request)
    {
        $reqData = $request->validate([
            'place_id' => 'required',
            'sort' => 'required|array',
            'sort.*' => 'required|numeric',
        ]);

        $place = $this->getPlace($reqData['place_id']);

        $this->productCategoryRepository->resort($reqData['place_id'], $reqData['sort']);

        return response()->json(['status' => 'success']);
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
