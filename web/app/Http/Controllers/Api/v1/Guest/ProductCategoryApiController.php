<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ProductCategoryRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Http\Resources\Guest\ProductCategoryWithProductsResource;

class ProductCategoryApiController extends Controller
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

        $productCategory = $this->productCategoryRepository->find($id);
        abort_if(!$productCategory, 404);

        $productCategory->products = $this->productRepository->getByProductCategoryId($id);

        return new ProductCategoryWithProductsResource($productCategory);
    }
}
