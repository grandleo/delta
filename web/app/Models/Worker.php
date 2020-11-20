<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

use App\Helpers\Traits\JsonFieldTrait;
use App\Helpers\Traits\StatusFieldTrait;

class Worker extends Authenticatable
{
    use HasFactory, SoftDeletes, Notifiable;
    use HasApiTokens;
    use JsonFieldTrait, StatusFieldTrait;

    const STATUSES = [
        'draft' => 0,
        'active' => 1,
    ];

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'place_id',
        'name', 'email', 'password',
        'name_full', 'phone',
        'image',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
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

    public function tables()
    {
        return $this->belongsToMany('App\Models\Table');
    }

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return 'worker.'.$this->id;
    }
}
