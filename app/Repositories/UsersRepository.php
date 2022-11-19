<?php

namespace App\Repositories;

use App\Models\User;
use App\Utilities\ReadsSqlFromFile;
use Illuminate\Support\Facades\DB;

class UsersRepository
{
	use ReadsSqlFromFile;

	public function getUserByUsername(string $username, bool $includePerson = false): ?User
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-user-by-username.sql"), [
			":username" => $username
		]);

		// Handle errors
		if (empty($results)) {
			abort(404, "User not found");
		}

		return new User($results[0], $includePerson);
	}

	public function getUsers(bool $includePerson = false): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-users.sql"));

		return array_map(
			fn ($row) => new User($row, $includePerson),
			$results
		);
	}

	public function getUserByDisplayName(string $displayName, bool $includePerson = false): ?User
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("users/get-user-by-display-name.sql"), [
			":display_name" => $displayName
		]);

		// Handle errors
		if (empty($results)) {
			abort(404, "User not found");
		}

		return new User($results[0], $includePerson);
	}

	public function createUser(string $displayName, int $personCode, bool $isAdmin, int $createdBy): void
	{
		// Execute the action
		DB::select($this->sqlFromFile("users/create-user.sql"), [
			":display_name" => $displayName,
			":person_code" => $personCode,
			":is_admin" => $isAdmin,
			":created_by" => $createdBy
		]);

		// NOTE: We don't return anything here
	}

	public function updateUserByDisplayName(string $existingDisplayName, string $newDisplayName, int $personCode, bool $isAdmin, int $updatedBy): void
	{
		// Execute the action
		DB::select($this->sqlFromFile("users/update-user-by-display-name.sql"), [
			":existing_display_name" => $existingDisplayName,
			":new_display_name" => $newDisplayName,
			":person_code" => $personCode,
			":is_admin" => $isAdmin,
			":updated_by" => $updatedBy
		]);

		// NOTE: We don't return anything here
	}

	public function archiveUserByDisplayName(string $displayName, int $archivedBy): void
	{
		// Execute the action
		DB::select($this->sqlFromFile("users/archive-user-by-display-name.sql"), [
			":display_name" => $displayName,
			":archived_by" => $archivedBy
		]);

		// NOTE: We don't return anything here
	}
}