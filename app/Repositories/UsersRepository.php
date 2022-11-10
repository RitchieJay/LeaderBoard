<?php

namespace App\Repositories;

use App\Models\User;
use App\Utilities\ReadsSqlFromFile;
use Illuminate\Support\Facades\DB;

class UsersRepository
{
	use ReadsSqlFromFile;

	public function getUserByUsername(string $username, bool $includePrivateFields = false): ?User
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-user-by-username.sql"), [
			":username" => $username
		]);

		// Fail if empty
		if (empty($results)) {
			return null;
		}

		return new User($results[0], $includePrivateFields);
	}
}