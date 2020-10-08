<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthSanctumExt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $modelClassName
     * @return mixed
     */
    public function handle($request, Closure $next, $modelClassName)
    {
        if (get_class(Auth::user()) !== $modelClassName) {
            abort(403);
        }

        return $next($request);
    }
}
