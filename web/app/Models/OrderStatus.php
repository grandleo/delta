<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;

class OrderStatus extends Model
{
    use SoftDeletes;
    use JsonFieldTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'place_category_id', 'place_id',
        'order_status_phase_id',
        'name', 'color',
        'sort',
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
                //
            }
        */
    ];


    // RELATIONS

    public function orderStatusPhase()
    {
        return $this->belongsTo('App\Models\OrderStatusPhase');
    }

    public function placeCategory()
    {
        return $this->belongsTo('App\Models\PlaceCategory');
    }

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }

    public function orders()
    {
        return $this->hasMany('App\Models\Order');
    }
}
