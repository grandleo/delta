<?php

namespace App\Repositories\Eloquent;

use App\Repositories\GuestRepositoryInterface;

use App\Models\Guest;
use Illuminate\Support\Collection;

class GuestRepository extends BaseRepository implements GuestRepositoryInterface
{
    /**
    * @param Guest $model
    */
    public function __construct(Guest $model)
    {
        parent::__construct($model);
    }
}
