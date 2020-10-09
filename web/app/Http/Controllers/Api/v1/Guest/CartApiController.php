<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderProductRepositoryInterface;
use App\Http\Resources\Guest\ProductResource;
use App\Http\Resources\Guest\OrderShortResource;

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
            throw \Illuminate\Validation\ValidationException::withMessages([
                'products' => [__('Какие-то из товаров не найдены в базе. Обновите страницу и попробуйте ещё раз.')],
            ]);
        }

        $amount = collect($reqData['products'])->reduce(function ($carry, $reqProduct) use ($products) {
            $product = $products->firstWhere('id', $reqProduct['id']);
            return $carry + $product->price * $reqProduct['qty'];
        });

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
            $product = $products->firstWhere('id', $reqProduct['id']);
            $this->orderProductRepository->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'qty' => $reqProduct['qty'],
            ]);
        }

        return new OrderShortResource($order);
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

        if ($request->status === 'paid') {
            if ($order->guest_id === \Auth::id()) {
                $order->setStatus('paid');
            } else {
                abort(401);
            }
        } elseif (!$order->guest_id) {
            $order->guest_id = \Auth::id();
        }

        $order->save();

        return new OrderShortResource($order);
    }
}
