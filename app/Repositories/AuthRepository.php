<?php

namespace App\Repositories;

use App\Models\Auth\LoggedInUser;
use App\Utilities\ReadsSqlFromFile;
use Illuminate\Support\Facades\DB;

class AuthRepository
{
	use ReadsSqlFromFile;

	public function getUserByUsername(string $username): ?LoggedInUser
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("auth/get-user-by-username.sql"), [
			":username" => $username
		]);

		// Fail if empty
		if (empty($results)) {
			return null;
		}

		return new LoggedInUser($results[0]);
	}
}