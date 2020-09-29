<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderProductRepositoryInterface;
use App\Http\Resources\Guest\ProductResource;
use App\Http\Resources\Guest\OrderResource;

class CartApiController extends Controller
{
    private $placeRepository;
    private $productRepository;
    private $orderRepository;
    private $orderProductRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        ProductRepositoryInterface $productRepository,
        OrderRepositoryInterface $orderRepository,
        OrderProductRepositoryInterface $orderProductRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->productRepository = $productRepository;
        $this->orderRepository = $orderRepository;
        $this->orderProductRepository = $orderProductRepository;
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
            'placeId' => 'required|integer',
            'productIds' => 'required|array',
            'productIds.*' => 'integer',
        ]);
        $products = $this->productRepository->getByPlaceIdAndProductIds($reqData['placeId'], $reqData['productIds']);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $reqData = $request->validate([
            'placeId' => 'required|integer',
            'tableId' => 'nullable|integer',
            'products' => 'required|array',
            'products.*.id' => 'required|integer',
            'products.*.qty' => 'required|integer|min:1',
            'params' => 'nullable|array',
        ]);

        $place = $this->placeRepository->find($reqData['placeId']);

        $productIds = collect($reqData['products'])->pluck('id')->toArray();

        $products = $this->productRepository->getByPlaceIdAndProductIds($reqData['placeId'], $productIds);

        if ($products->count() !== count($productIds)) {
            throw new \Exception(__('Какие-то из товаров не найдены в базе.'));
        }

        $amount = $products->sum('price');

        // create draft order
        $order = $this->orderRepository->create([
            'place_id' => $reqData['placeId'],
            'table_id' => $reqData['tableId'],
            'currency' => $place->currency,
            'amount' => $amount,
            'params' => $reqData['params'],
        ]);

        // create orderProducts
        foreach ($reqData['products'] as $reqProduct) {
            $repProduct = $products->firstWhere('id', $reqProduct['id']);
            $this->orderProductRepository->create([
                'order_id' => $order->id,
                'product_id' => $repProduct->id,
                'name' => $repProduct->name,
                'price' => $repProduct->price,
                'qty' => $reqProduct['qty'],
            ]);
        }

        return new OrderResource($order);
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
        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $order->guest_id = \Auth::id();
        $order->save();

        return new OrderResource($order);
    }
}
