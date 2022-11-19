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

	public function getLeaderboardByUrlName(string $urlName): Leaderboard
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("leaderboards/get-leaderboard-by-url-name.sql"), [
			":url_name" => $urlName
		]);

		// Handle errors
		if (empty($results)) {
			abort(404, "Leaderboard not found");
		}

		return new Leaderboard($results[0]);
	}

	public function createLeaderboard(string $name, string $urlName, int $rankingMethodsId, string $theme, int $createdBy): void
	{
		// Fetch the data
		DB::select($this->sqlFromFile("leaderboards/create-leaderboard.sql"), [
			":name" => $name,
			":url_name" => $urlName,
			":ranking_methods_id" => $rankingMethodsId,
			":theme" => $theme,
			":created_by" => $createdBy
		]);

		// NOTE: We don't return anything here
	}

	public function updateLeaderboardByUrlName(string $existingUrlName, string $name, string $urlName, int $rankingMethodsId, string $theme, int $updatedBy): void
	{
		// Fetch the data
		DB::select($this->sqlFromFile("leaderboards/update-leaderboard-by-url-name.sql"), [
			":existing_url_name" => $existingUrlName,
			":name" => $name,
			":url_name" => $urlName,
			":ranking_methods_id" => $rankingMethodsId,
			":theme" => $theme,
			":updated_by" => $updatedBy
		]);

		// NOTE: We don't return anything here
	}

	public function archiveLeaderboardByUrlName(string $urlName, int $archivedBy): void
	{
		// Fetch the data
		DB::select($this->sqlFromFile("leaderboards/archive-leaderboard-by-url-name.sql"), [
			":url_name" => $urlName,
			":archived_by" => $archivedBy
		]);

		// NOTE: We don't return anything here
	}
}