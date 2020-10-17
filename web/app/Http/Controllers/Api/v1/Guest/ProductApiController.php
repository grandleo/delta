<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ProductCategoryRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Http\Resources\Guest\ProductResource;

class ProductApiController extends Controller
{
    private $productCategoryRepository;
    private $productRepository;

    public function __construct(
        ProductCategoryRepositoryInterface $productCategoryRepository,
        ProductRepositoryInterface $productRepository
    )
    {
        $this->productCategoryRepository = $productCategoryRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        preg_match('/\d+$/', $slug, $id_match);
        abort_if(!isset($id_match[0]), 404);

        $id = $id_match[0];

        $product = $this->productRepository->find($id);
        abort_if(!$product, 404);

        $product->productCategory = $this->productCategoryRepository->find($product->product_category_id);

        return new ProductResource($product);
    }
}
