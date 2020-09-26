<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;

class ProductCategory extends Model
{
    use SoftDeletes;
    use JsonFieldTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'place_id',
        'name', 'slug', 'image',
        'descr_short',
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
                products_active_count: int,
            }
        */
    ];


    // RELATIONS

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }

    public function products()
    {
        return $this->hasMany('App\Models\Product');
    }
}
