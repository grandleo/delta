<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductCategoryRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Http\Resources\Manager\ProductResource;
use App\Http\Resources\Manager\ProductCategoryResource;

class ProductApiController extends Controller
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
    public function index(Request  $request)
    {
        $reqData = $request->validate([
            'product_category_id' => 'required',
        ]);

        list($place, $productCategory) = $this->getChecked($reqData['product_category_id']);

        $products = $this->productRepository->getByProductCategoryId($productCategory->id, true);
        $productCategory = $this->productCategoryRepository->find($reqData['product_category_id']);

        return ProductResource::collection($products)
            ->additional([
                'productCategory' => new ProductCategoryResource($productCategory),
            ]);
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
            'product_category_id' => 'required',
        ]);

        $isNew = $id == '0';

        list($place, $productCategory) = $this->getChecked($reqData['product_category_id']);

        if ($isNew) {
            return response()->json([
                'data' => null,
                'form' => [
                    'productCategory' => new ProductCategoryResource($productCategory),
                ],
            ]);
        }

        $product = $this->productRepository->find($id);
        abort_if(!$product || $product->product_category_id !== $productCategory->id, 404);

        return (new ProductResource($product))
            ->additional([
                'form' => [
                    'productCategory' => new ProductCategoryResource($productCategory),
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
            'product_category_id' => 'required',
            'name' => 'required|string|min:2|max:250',
            'descr_short' => 'nullable|string|min:4|max:250',
            'image' => 'nullable|string|max:250',
            'price' => 'required|numeric',
            'weight' => 'required|numeric',
            'waiting_minutes' => 'required|numeric',
            'kcal' => 'nullable|numeric',
            'active' => 'required|numeric',
        ]);

        $isNew = $id == '0';

        list($place, $productCategory) = $this->getChecked($reqData['product_category_id']);

        $reqData['price'] = $reqData['price'] * 100;
        $reqData['params']['weight'] = +$reqData['weight'];
        $reqData['params']['waiting_minutes'] = +$reqData['waiting_minutes'];
        $reqData['params']['kcal'] = isset($reqData['kcal']) ? +$reqData['kcal'] : null;

        if ($isNew) {
            $reqData['place_id'] = $place->id;
            $reqData['slug'] = \Str::slug($reqData['name']);
            $product = $this->productRepository->create($reqData);

            $reqData_loc = [
                'params' => $reqData['params'],
                'active' => $reqData['active'],
            ];
            $this->productRepository->updateFromForm($product->id, $reqData_loc);
        } else {
            $product = $this->productRepository->find($id);
            abort_if(!$product || $product->product_category_id !== $productCategory->id, 404);

            $this->productRepository->updateFromForm($product->id, $reqData);
        }

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'success',
                'message' => $isNew ? __('Блюдо создано') : __('Успешно сохранено'),
            ]],
            'productId' => $product->id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $reqData = $request->validate([
            'product_category_id' => 'required',
        ]);

        list($place, $productCategory) = $this->getChecked($reqData['product_category_id']);

        $product = $this->productRepository->find($id);
        abort_if(!$product || $product->product_category_id !== $productCategory->id, 404);

        $this->productRepository->delete($id);

        return response()->json([
            'status' => 'success',
            'alerts' => [[
                'type' => 'info',
                'message' => __('Блюдо удалено'),
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
            'place_id' => 'nullable',
            'product_category_id' => 'required',
            'sort' => 'required|array',
            'sort.*' => 'required|numeric',
        ]);

        list($place, $productCategory) = $this->getChecked($reqData['product_category_id'], $reqData['place_id']);

        $this->productRepository->resort($reqData['product_category_id'], $reqData['sort']);

        return response()->json(['status' => 'success']);
    }


    private function getChecked($product_category_id, $place_id = null)
    {
        $place = $place_id
            ? $this->placeRepository->find($place_id)
            : $this->placeRepository->findByWhere([['manager_id', '=', \Auth::id()]]);
        abort_if(!$place || $place->manager_id !== \Auth::id(), 404);

        $productCategory = $this->productCategoryRepository->find($product_category_id);
        abort_if(!$productCategory || $productCategory->place_id !== $place->id, 404);

        return [$place, $productCategory];
    }
}
