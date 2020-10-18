<?php

namespace App\Http\Controllers\Api\v1\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\Guest\NotifResource;

class NotifApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $guest = \Auth::user();

        return NotifResource::collection($guest->notifications()->limit(20)->get());
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function markRead()
    {
        $guest = \Auth::user();
        $guest->unreadNotifications()->update(['read_at' => now()]);

        return response()->json([
            'status' => 'success',
        ]);

    }
}
