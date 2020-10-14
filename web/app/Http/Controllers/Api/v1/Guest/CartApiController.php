<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\TableRepositoryInterface;
use App\Repositories\WorkerRepositoryInterface;
use App\Repositories\OrderRepositoryInterface;
use App\Repositories\OrderProductRepositoryInterface;

use App\Events\OrderStatusPaid;

use App\Http\Resources\Guest\ProductResource;
use App\Http\Resources\Guest\OrderShortResource;

class CartApiController extends Controller
{
    private $placeRepository;
    private $productRepository;
    private $tableRepository;
    private $workerRepository;
    private $orderRepository;
    private $orderProductRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        ProductRepositoryInterface $productRepository,
        TableRepositoryInterface $tableRepository,
        WorkerRepositoryInterface $workerRepository,
        OrderRepositoryInterface $orderRepository,
        OrderProductRepositoryInterface $orderProductRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->productRepository = $productRepository;
        $this->tableRepository = $tableRepository;
        $this->workerRepository = $workerRepository;
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

        $tables = $this->tableRepository->getByPlaceIdSorted($place->id);
        if (!$reqData['tableId'] && $tables->count()) {
            $reqData['tableId'] = $tables->first()->id;
        }

        $reqData['worker_id'] = null;

        $amount = collect($reqData['products'])->reduce(function ($carry, $reqProduct) use ($products) {
            $product = $products->firstWhere('id', $reqProduct['id']);
            return $carry + $product->price * $reqProduct['qty'];
        });

        // create draft order
        $order = $this->orderRepository->create([
            'place_id' => $reqData['placeId'],
            'table_id' => $reqData['tableId'],
            'worker_id' => $reqData['worker_id'],
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
        $guest = \Auth::user();

        $order = $this->orderRepository->find($id);
        abort_if(!$order, 404);

        $reqData_loc = [];

        if ($request->status === 'paid') {
            if ($order->guest_id === $guest->id) {
                event(new OrderStatusPaid($id));
                $reqData_loc['status'] = 'paid';
            } else {
                abort(401);
            }
        } elseif (!$order->guest_id) {
            $reqData_loc['guest_id'] = $guest->id;
        }

        $order = $this->orderRepository->updateFromForm($order->id, $reqData_loc);

        return new OrderShortResource($order);
    }
}
