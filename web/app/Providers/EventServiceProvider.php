<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        'App\Events\OrderStatusPaid' => [
            'App\Listeners\OrderSetOrderStatusFirst',
        ],
        'App\Events\OrderOrderStatusSet' => [
            'App\Listeners\OrderSetOrderStatusAny',
            'App\Listeners\OrderOrderStatusNotificationsCreate',
        ],
        'App\Events\OrderMessageSend' => [
            'App\Listeners\OrderMessageNotificationsCreate',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
