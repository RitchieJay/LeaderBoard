<?php

namespace App\Http\Middleware\Api;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class AuthenticateOptional extends Middleware
{
    protected function unauthenticated($request, array $guards)
    {
		// Allow this method to complete so the middleware succeeds
		return;
	}
}
