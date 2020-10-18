<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('order.{orderId}', function ($user, $orderId) {
    return true;
});

Broadcast::channel('guest.{guestId}', function ($user, $guestId) {
    return (int) $guestId === (int) $user->id && get_class($user) === 'App\Models\Guest';
});
