<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;
use App\Helpers\Traits\StatusFieldTrait;

class Product extends Model
{
    use SoftDeletes;
    use JsonFieldTrait, StatusFieldTrait;

    const STATUSES = [
        'draft' => 0,
        'active' => 1,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'place_id', 'product_category_id',
        'name', 'slug', 'image',
        'price',
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
                //
            }
        */
    ];


    // RELATIONS

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }

    public function productCategory()
    {
        return $this->belongsTo('App\Models\ProductCategory');
    }
}
