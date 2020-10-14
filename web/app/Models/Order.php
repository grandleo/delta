<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;
use App\Helpers\Traits\StatusFieldTrait;

class Order extends Model
{
    use SoftDeletes;
    use JsonFieldTrait, StatusFieldTrait;

    const STATUSES = [
        'draft' => 0,
        'paid' => 1,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'guest_id', 'worker_id',
        'place_id', 'table_id',
        'order_status_id', 'order_status_at',
        'currency', 'amount',
        'params',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'params' => 'array',
        /*
            params: {
                cutlery_qty: int, // 1 to ? - количество приборов
            }
        */
    ];


    // RELATIONS

    public function guest()
    {
        return $this->belongsTo('App\Models\Guest');
    }

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }

    public function table()
    {
        return $this->belongsTo('App\Models\Table');
    }

    public function worker()
    {
        return $this->belongsTo('App\Models\Worker');
    }

    public function orderProducts()
    {
        return $this->hasMany('App\Models\OrderProduct');
    }

    public function products()
    {
        return $this->belongsToMany('App\Models\Product')
            ->withPivot('name', 'price', 'qty');
    }

    public function orderStatus()
    {
        return $this->belongsTo('App\Models\OrderStatus');
    }

    public function orderStatuses()
    {
        return $this->belongsToMany('App\Models\OrderStatus')
            ->using('App\Models\OrderOrderStatus')
            ->withPivot(['userable_id', 'userable_type'])
            ->withTimestamps();
    }
}
