<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    const GUEST = 1;
    const MANAGER = 2;
    const WORKER = 3;
    const ADMIN = 4;

    protected $fillable = [
        'email', 'token', 'user_type'
    ];
}
