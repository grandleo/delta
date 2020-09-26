<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ProductRepositoryInterface;
use App\Http\Resources\Guest\ProductResource;

class CartApiController extends Controller
{
    private $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $reqData = $request->validate([
            'placeId' => 'required|integer',
            'productIds' => 'required|array',
            'productIds.*' => 'integer',
        ]);
        $products = $this->productRepository->getByPlaceIdAndProductIds($reqData['placeId'], $reqData['productIds']);

        return ProductResource::collection($products);
    }
}
