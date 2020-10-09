<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\StatusFieldTrait;

class Table extends Model
{
    use SoftDeletes;
    use StatusFieldTrait;

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
        'place_id',
        'name', 'descr_short',
        'sort',
    ];


    // RELATIONS

    public function place()
    {
        return $this->belongsTo('App\Models\Place');
    }
}
