<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

use App\Http\Resources\Guest\OrderStatusResource;

class OrderOrderStatusNotification extends Notification
{
    use Queueable;

    public $order_id;
    public $orderStatus;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order_id, $orderStatus)
    {
        $this->order_id = $order_id;
        $this->orderStatus = $orderStatus;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $orderStatus = new OrderStatusResource($this->orderStatus);
        return [
            'c_type' => 'status-new',
            'order_id' => $this->order_id,
            'orderStatus' => $orderStatus,
        ];
    }
}
