<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Helpers\Traits\JsonFieldTrait;

class Message extends Model
{
    use SoftDeletes;
    use JsonFieldTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'messageable_type', 'messageable_id',
        'userable_type', 'userable_id',
        'text',
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


    // MUTATORS

    public function getIsSystemAttribute()
    {
        return !$this->userable_id || !$this->userable_type;
    }

    public function getIsOwnerAttribute()
    {
        $user = \Auth::user();
        return $this->userable_id == $user->id && $this->userable_type == get_class($user);
    }

    public function getOwnerUidAttribute()
    {
        switch ($this->userable_type) {
            case 'App\\Models\\Guest':
                return 'g'.$this->userable_id;
            case 'App\\Models\\Worker':
                return 'w'.$this->userable_id;
            case 'App\\Models\\Manager':
                return 'm'.$this->userable_id;
        }
        return '0';
    }


    // RELATIONS

    public function messageable()
    {
        return $this->morphTo();
    }

    public function userable()
    {
        return $this->morphTo();
    }
}
