<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use App\Repositories\OrderRepositoryInterface;
use Illuminate\Http\Request;
use App\Traits\TinkoffMerchant;

class PaymentApiController extends Controller
{
    use TinkoffMerchant;
    private $user_prefix = 'guest_';
    private $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function initPayment($order_id)
    {
        $guest = \Auth::user();
        $customer_key = $this->user_prefix . $guest->id;
        $order = $this->orderRepository->findByIdAndGuestId($order_id, $guest->id);

        $params = [
            'CustomerKey' => $customer_key,
            'OrderId' => $order_id,
            'Amount' => $order->amount,
            'SuccessURL' => 'http://delta.loc/maykop/cart-payment?success-payment=true',
        ];

        if ($guest->has_tinkoff) {
            $data = $this->init($params);
        } else {
            $this->storeCustomer($customer_key);

            $data = $this->init($params);
        }

        return response()->json([
            'data' => $data
        ]);
    }

    public function storeCustomer($customer_key)
    {

        $data = $this->addCustomer([
            'CustomerKey'=> $customer_key
        ]);

        if ($data['Success']) {
            return response()->json([
                'data' => $data
            ]);
        }
    }

    /**
     * @return mixed
     */
    public function getCards()
    {
        $guest = \Auth::user();
        $data = $this->getCardList([
            'CustomerKey' => $this->user_prefix.$guest->id
        ]);

        if (isset($data['ErrorCode']) && $data['ErrorCode'] == 7) {
            return response()->json([
                'data' => []
            ]);
        }

        if (isset($data['Success']) && !$data['Success']) {
            return response()->json([
                'error' => $data
            ], 400);
        }

        return response()->json([
            'data' => $data
        ]);
    }

    public function customer()
    {
        $guest = \Auth::user();

        $data = $this->getCustomer([
            'CustomerKey'=> $this->user_prefix . $guest->id
        ]);

        return response()->json([
            'data' => $data
        ]);
    }
}
