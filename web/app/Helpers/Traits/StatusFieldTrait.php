<?php

namespace App\Helpers\Traits;

trait StatusFieldTrait
{
    // SCOPES

    public function scopeStatus($query, $statusName, $operator = '=')
    {
        if (is_array($statusName)) {
            $statusArr = [];
            foreach ($statusName as $name) {
                $statusArr[] = parent::STATUSES[$name];
            }
            return $query->whereIn($this->getTable().'.status', $statusArr);
        } else {
            $status = self::STATUSES[$statusName];
            return $query->where($this->getTable().'.status', $operator, $status);
        }
    }


    // METHODS

    public function setStatus($statusName)
    {
        $this->status = parent::STATUSES[$statusName];
    }
}
