<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Repositories\PlaceRepositoryInterface;
use App\Models\Order;

class FinanceApiController extends Controller
{
    private $placeRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository
    )
    {
        $this->placeRepository = $placeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $now = Carbon::now();

        $place = $this->getPlace();

        $query1 = Order::query()
            ->where('place_id', $place->id)
            ->status('draft', '!=');

        $d1 = $now->copy();
        $res[] = [
            'title' => 'Заказы сегодня:',
            'dates' => [$d1->format('Y-m-d')],
            'count' => (clone $query1)->whereDate('created_at', $d1)->count(),
            'amount' => (clone $query1)->whereDate('created_at', $d1)->sum('amount'),
        ];
        $d1 = $now->copy()->addDays(-1);
        $res[] = [
            'title' => 'Заказы вчера:',
            'dates' => [$d1->format('Y-m-d')],
            'count' => (clone $query1)->whereDate('created_at', $d1)->count(),
            'amount' => (clone $query1)->whereDate('created_at', $d1)->sum('amount'),
        ];
        $d1 = $now->copy()->startOfWeek();
        $d2 = $now->copy()->endOfWeek();
        $res[] = [
            'title' => 'За эту неделю:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->addDays(-7)->startOfWeek();
        $d2 = $now->copy()->addDays(-7)->endOfWeek();
        $res[] = [
            'title' => 'За прошлую неделю:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->startOfMonth();
        $d2 = $now->copy()->endOfMonth();
        $res[] = [
            'title' => 'За этот месяц:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];
        $d1 = $now->copy()->addMonths(-1)->startOfMonth();
        $d2 = $now->copy()->addMonths(-1)->endOfMonth();
        $res[] = [
            'title' => 'За прошлый месяц:',
            'dates' => [$d1->format('Y-m-d'), $d2->format('Y-m-d')],
            'count' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->count(),
            'amount' => (clone $query1)
                ->whereBetween('created_at', [$d1, $d2])->sum('amount'),
        ];

        return [
            'data' => $res
        ];
    }

    private function getPlace($place_id = null)
    {
        $place = $place_id
            ? $this->placeRepository->find($place_id)
            : $this->placeRepository->findByWhere([['manager_id', '=', \Auth::id()]]);
        abort_if(!$place || $place->manager_id !== \Auth::id(), 404);

        return $place;
    }
}
