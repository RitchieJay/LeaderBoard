<?php

namespace App\Services\Auth;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;

class AzureGuard implements Guard
{
	use GuardHelpers;

    /**
     * The request instance.
     *
     * @var \Illuminate\Http\Request
     */
    protected Request $request;

    /**
     * The service to validate the token.
     *
     * @var \App\Services\Auth\AzureTokenValidator
     */
    protected AzureTokenValidator $azureTokenValidator;

    /**
     * The name of the query string item from the request containing the API token.
     *
     * @var string
     */
    protected string $inputKey;

    /**
     * Create a new authentication guard.
     *
     * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
     * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Services\Auth\AzureTokenValidator  $azureTokenValidator
     * @param  string  $inputKey
     * @return void
     */
    public function __construct(UserProvider $provider, Request $request, AzureTokenValidator $azureTokenValidator, $inputKey = 'api_token')
    {
        $this->provider = $provider;
        $this->request = $request;
		$this->azureTokenValidator = $azureTokenValidator;
        $this->inputKey = $inputKey;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
	{
		// If we have the user, return them
		if (isset($this->user)) {
			return $this->user;
		}

		// Retrieve the request token
        $token = $this->getTokenForRequest();

		// If we have the token, validate it
		if (isset($token)) {
			// Validate and retrieve the decoded token
			$token = $this->azureTokenValidator->getValidatedToken($token);

			// If we have the UPN, retrieve the user
			if (isset($token->unique_name)) {
				// Retrieve the user by UPN
				$user = $this->provider->retrieveById($token->unique_name);

				// If we got the user, store them
				if (isset($user)) {
					$this->setUser($user);
					return $this->user;
				}
			}
		}

		return null;
	}

    /**
     * Validate a user's credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
	{
		if (!$this->hasUser()) {
			return false;
		}

		return $this->provider->validateCredentials($this->user, $credentials);
	}

    /**
     * Get the token for the current request.
     *
     * @return string
     */
    private function getTokenForRequest()
    {
		// First, check the bearer token
		$token = $this->request->bearerToken();

		// Check the query string
		if (!isset($token)) {
    		$token = $this->request->query($this->inputKey);
		}

        return $token;
    }
}