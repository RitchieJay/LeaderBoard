<?php

namespace App\Repositories;

use App\Models\Leaderboard;
use App\Models\RankingMethod;
use App\Utilities\ReadsSqlFromFile;
use Illuminate\Support\Facades\DB;

class LeaderboardsRepository
{
	use ReadsSqlFromFile;

	public function getRankingMethods(): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("leaderboards/get-ranking-methods.sql"));

		return array_map(
			fn ($row) => new RankingMethod($row),
			$results
		);
	}

	public function getLeaderboards(): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("leaderboards/get-leaderboards.sql"));

		return array_map(
			fn ($row) => new Leaderboard($row),
			$results
		);
	}
}