<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Table extends Model
{
    use SoftDeletes;

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
