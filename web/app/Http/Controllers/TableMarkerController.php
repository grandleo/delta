<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repositories\PlaceRepositoryInterface;
use App\Repositories\TableRepositoryInterface;

class TableMarkerController extends Controller
{
    private $placeRepository;
    private $tableRepository;

    public function __construct(
        PlaceRepositoryInterface $placeRepository,
        TableRepositoryInterface $tableRepository
    )
    {
        $this->placeRepository = $placeRepository;
        $this->tableRepository = $tableRepository;
    }

    public function index($marker_code)
    {
        $marker_code;
        $table = $this->tableRepository->findByWhere([
            ['marker_code', '=', $marker_code],
        ]);
        if (!$table) {
            return redirect()->route('landing');
        }

        $place = $this->placeRepository->find($table->place_id);
        if (!$place) {
            return redirect()->route('landing');
        }

        return redirect($place->routeTable($table->hasStatus('active') ? $table->id : null));
    }
}
