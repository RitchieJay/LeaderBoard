<?php

namespace App\Services\Auth;

use Illuminate\Contracts\Auth\UserProvider as BaseUserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Repositories\AuthRepository;

class DbUserProvider implements BaseUserProvider
{
	private AuthRepository $authRepo;

	public function __construct(AuthRepository $authRepo)
	{
		$this->authRepo = $authRepo;
	}

    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed  $identifier
     * @return Authenticatable|null
     */
	public function retrieveById($identifier):?Authenticatable
	{
		return $this->authRepo->getUserByUsername($identifier);
	}

    /**
     * Retrieve a user by their unique identifier and "remember me" token.
     *
     * @param  mixed   $identifier
     * @param  string  $token
     * @return Authenticatable|null
     */
	public function retrieveByToken($identifier, $token):?Authenticatable
	{
		return null;
	}

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return Authenticatable|null
     */
	public function retrieveByCredentials(array $credentials):?Authenticatable
	{
		return null;
	}

    /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  Authenticatable  $user
     * @param  string  $token
     * @return void
     */
	public function updateRememberToken(Authenticatable $user, $token):void
	{
		return;
	}

    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array  $credentials
     * @return bool
     */
	public function validateCredentials(Authenticatable $user, array $credentials):bool
	{
		return true;
	}
}