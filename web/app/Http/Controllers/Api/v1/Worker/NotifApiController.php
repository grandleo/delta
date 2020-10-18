<?php

namespace App\Http\Controllers\Api\v1\Worker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\Worker\NotifResource;

class NotifApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $worker = \Auth::user();
        $limit = 120;

        return NotifResource::collection($worker->notifications()->limit($limit)->get());
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function markRead()
    {
        $worker = \Auth::user();
        $worker->unreadNotifications()->update(['read_at' => now()]);

        return response()->json([
            'status' => 'success',
        ]);

    }
}
