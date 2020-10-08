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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $reqData = $request->validate([
            'place_id' => 'required',
        ]);

        $place = $this->getPlace($reqData['place_id']);

        $productCategories = $this->productCategoryRepository->getByPlaceIdSorted($place->id, true);

        return ProductCategoryResource::collection($productCategories);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $reqData = $request->validate([
            'place_id' => 'required',
        ]);

        $place = $this->getPlace($reqData['place_id']);

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
        } else {
            $productCategory = $this->productCategoryRepository->find($id);
            abort_if(!$productCategory || $productCategory->place_id !== $place->id, 403);

            $this->productCategoryRepository->updateFromForm($id, $reqData);
        }

        return response()->json(['success' => true, 'productCategoryId' => $productCategory->id]);
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

        return response()->json(['success' => true]);
    }


    private function getPlace($place_id)
    {
        $place = $this->placeRepository->find($place_id);
        abort_if(!$place || $place->manager_id !== \Auth::id(), 404);

        return $place;
    }
}
