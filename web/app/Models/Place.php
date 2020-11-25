<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;

class Place extends Model
{
    use SoftDeletes;
    use JsonFieldTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'manager_id', 'place_category_id',
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
                rating_avg: int, // 0 to 5
                prices_from: int,
                works_until: string,
            }
        */
    ];


    // RELATIONS

    public function manager()
    {
        return $this->belongsTo('App\Models\Manager');
    }

    public function placeCategory()
    {
        return $this->belongsTo('App\Models\PlaceCategory');
    }

    public function tables()
    {
        return $this->hasMany('App\Models\Table')->orderby('deleted_at', 'ASC')->withTrashed();
    }

    public function productCategories()
    {
        return $this->hasMany('App\Models\ProductCategory');
    }

    public function workers()
    {
        return $this->hasMany('App\Models\Worker')->orderby('deleted_at', 'ASC')->withTrashed();
    }

    public function orders()
    {
        return $this->hasMany('App\Models\Order');
    }

    // METHODS

    public function routeTable($table_id = null)
    {
        return '/'.$this->slug.($table_id ? '?t='.$table_id : '');
    }
}
