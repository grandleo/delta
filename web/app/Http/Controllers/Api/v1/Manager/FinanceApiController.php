<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Models\Order;

class FinanceApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $now = Carbon::now();

        $d1 = $now->copy();
        $res[] = [
            'title' => 'Заказы сегодня:',
            'dates' => [$d1->format('Y-m-d')],
            'count' => Order::status('draft', '!=')->whereDate('created_at', $d1)->count(),
            'amount' => Order::status('draft', '!=')->whereDate('created_at', $d1)->sum('amount'),
        ];
        $d1 = $now->copy()->addDay(-1);
        $res[] = [
            'title' => 'Заказы вчера:',
            'dates' => [$d1->format('Y-m-d')],
            'count' => Order::status('draft', '!=')->whereDate('created_at', $d1)->count(),
            'amount' => Order::status('draft', '!=')->whereDate('created_at', $d1)->sum('amount'),
        ];
        $d1 = $now->copy()->startOfWeek();
        $d2 = $now->copy()->endOfWeek();
        $res[] = [
            'title' => 'За эту неделю:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->addDay(-8)->startOfWeek();
        $d2 = $now->copy()->addDay(-8)->startOfWeek();
        $res[] = [
            'title' => 'За прошлую неделю:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->startOfMonth();
        $d2 = $now->copy()->startOfMonth();
        $res[] = [
            'title' => 'За этот месяц:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->addMonth(-1)->startOfMonth();
        $d2 = $now->copy()->addMonth(-1)->startOfMonth();
        $res[] = [
            'title' => 'За прошлый месяц:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => Order::status('draft', '!=')
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];

        return $res;
    }
}
