<?php

namespace App\Helpers\Traits;

trait JsonFieldTrait
{
    public function getJson(string $fieldName, string $key, $defaultVal)
    {
        return \Arr::get($this[$fieldName], $key, $defaultVal);
    }

    public function setJson(string $fieldName, string $key, $value)
    {
        $field = $this[$fieldName] ? $this[$fieldName] : [];
        \Arr::set($field, $key, $value);
        $this[$fieldName] = $field;
    }
}
