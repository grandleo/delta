<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductCategoryRepositoryInterface;
use App\Http\Resources\Guest\PlaceResource;
use App\Http\Resources\Guest\PlaceWithProductCategoriesResource;

class PlaceApiController extends Controller
{
    private $placeRepository;
    private $productCategoryRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        ProductCategoryRepositoryInterface $productCategoryRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->productCategoryRepository = $productCategoryRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $places = $this->placeRepository->getAllSorted();

        return PlaceResource::collection($places);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $slug)
    {
        $reqData = $request->validate([
            'table_id' => 'nullable|numeric',
        ]);

        $table_id = !empty($reqData['table_id']) ? $reqData['table_id'] : null;

        $place = $this->placeRepository->findBySlug($slug, $table_id);
        abort_if(!$place, 404);

        $place->productCategories = $this->productCategoryRepository->getByPlaceIdSorted($place->id);

        return new PlaceWithProductCategoriesResource($place);
    }
}
