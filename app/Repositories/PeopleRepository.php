<?php

namespace App\Repositories;

use App\Models\Person;
use App\Utilities\ReadsSqlFromFile;
use Illuminate\Support\Facades\DB;

class PeopleRepository
{
	use ReadsSqlFromFile;

	public function searchPeople(string $query, int $offset = 0, int $take = 20): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("people/search-people.sql"), [
			":query" => $query,
			":offset" => $offset,
			":take" => $take,
		]);

		return array_map(
			fn ($row) => new Person($row),
			$results
		);
	}
}