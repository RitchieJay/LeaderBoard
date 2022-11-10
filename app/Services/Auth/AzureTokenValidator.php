<?php

namespace App\Services\Auth;

use Firebase\JWT\JWT;
use Firebase\JWT\CachedKeySet;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Psr7\HttpFactory as GuzzleHttpFactory;
use stdClass;
use Throwable;

class AzureTokenHeader
{
	public string $typ;
	public string $alg;
	public string $x5t;
	public string $kid;

	public function __construct(string $tokenHeader)
	{
		// Decode the header
		$properties = json_decode(base64_decode($tokenHeader));

		$this->typ = $properties->typ;
		$this->alg = $properties->alg;
		$this->x5t = $properties->x5t;
		$this->kid = $properties->kid;
	}
}

class AzureTokenValidator
{
	private string $clientId;
	private string $tenantId;
	private string $discoveryUrl;

	public function __construct(string $clientId, string $tenantId, string $discoveryUrl)
	{
		$this->clientId = $clientId;
		$this->tenantId = $tenantId;
		$this->discoveryUrl = $discoveryUrl;
	}

	public function getValidatedToken(string $token): ?stdClass
	{
		try {
			// Get the discovery keys
			$keySet = new CachedKeySet(
				$this->discoveryUrl,
				new GuzzleClient(),
				new GuzzleHttpFactory(),
				app("cache.psr6"),
				null,
				true,
				($this->getTokenHeader($token))->alg
			);

			// Decode the token
			$decodedToken = JWT::decode($token, $keySet);

			// Validate claims
			if (
				$decodedToken->aud === $this->clientId &&
				$decodedToken->tid === $this->tenantId
			) {
				return $decodedToken;
			}

		}
		catch (Throwable) {
			// Silently fall through and fail
			// ...
		}

		return null;
	}

	private function getTokenHeader(string $token): ?AzureTokenHeader
	{
		// Retrieve the parts of the token
		$tokenParts = explode(".", $token);

		// Ensure we have the header
		if (count($tokenParts) > 0) {
			return new AzureTokenHeader($tokenParts[0]);
		}

		return null;
	}
}