<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\ProductCategoryRepositoryInterface;
use App\Http\Resources\Guest\ProductCategoryWithProductsResource;

class ProductCategoryApiController extends Controller
{
    private $productCategoryRepository;

    public function __construct(ProductCategoryRepositoryInterface $productCategoryRepository)
    {
        $this->productCategoryRepository = $productCategoryRepository;
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

        $productCategory->load([
            'products',
        ]);

        return new ProductCategoryWithProductsResource($productCategory);
    }
}
