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

	public function getUsers(bool $includePrivateFields = false): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-users.sql"));

		return array_map(
			fn ($row) => new User($row, $includePrivateFields),
			$results
		);
	}

	public function getUserByDisplayName(string $displayName, bool $includePrivateFields = false): ?User
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-user-by-display-name.sql"), [
			":display_name" => $displayName
		]);

		// Fail if empty
		if (empty($results)) {
			return null;
		}

		return new User($results[0], $includePrivateFields);
	}
}