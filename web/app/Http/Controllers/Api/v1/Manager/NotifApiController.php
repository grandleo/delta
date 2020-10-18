<?php

namespace App\Http\Controllers\Api\v1\Manager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\Manager\NotifResource;

class NotifApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $manager = \Auth::user();
        $limit = 160;

        return NotifResource::collection($manager->notifications()->limit($limit)->get());
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function markRead()
    {
        $manager = \Auth::user();
        $manager->unreadNotifications()->update(['read_at' => now()]);

        return response()->json([
            'status' => 'success',
        ]);

    }
}
