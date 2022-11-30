<?php

namespace App\Repositories;

use App\Models\Leaderboard;
use App\Models\LeaderboardScore;
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

	public function getLeaderboardByUrlName(string $urlName, bool $includeInactive = false): Leaderboard
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("leaderboards/get-leaderboard-by-url-name.sql"), [
			":url_name" => $urlName,
			":include_inactive" => $includeInactive
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

	public function getScoresForLeaderboard(string $urlName, bool $includePerson = false): array
	{
		// Fetch the data
		$results = DB::select($this->sqlFromFile("leaderboards/get-scores-for-leaderboard.sql"), [
			":url_name" => $urlName,
		]);

		return array_map(
			fn ($row) => new LeaderboardScore($row, $includePerson),
			$results
		);
	}

	public function updateLeaderboardScoreForUser(string $leaderboardUrlName, string $userDisplayName, string $score = null, int $updatedBy): void
	{
		// Fetch the data
		DB::select($this->sqlFromFile("leaderboards/update-leaderboard-score-for-user.sql"), [
			":leaderboard_url_name" => $leaderboardUrlName,
			":user_display_name" => $userDisplayName,
			":score" => $score,
			":updated_by" => $updatedBy
		]);

		// NOTE: We don't return anything here
	}

	public function rankScores(array &$scores, string $rankingMethod): void
	{
		switch ($rankingMethod) {
			case RankingMethod::NUMERIC_HIGH_TO_LOW:
			default:
				$this->rankScoresNumericHighToLow($scores);
		}
	}

	private function rankScoresNumericHighToLow(array &$scores): void
	{
		// Sort the scores in descending order
		usort($scores, function ($a, $b) {
			$aScore = (float)$a->score;
			$bScore = (float)$b->score;

			if (abs($aScore - $bScore) < PHP_FLOAT_EPSILON) {
				return 0;
			}

			return $aScore < $bScore ? 1 : -1;
		});

		// Rank the scores
		$previousScore = null;
		$currentRank = 0;
		foreach ($scores as &$score) {
			$currentScore = (float)$score->score;

			// If the score is less than previous, increase rank
			if (!isset($previousScore) || abs($currentScore - $previousScore) > PHP_FLOAT_EPSILON) {
				$currentRank += 1;
			}

			$score->rank = $currentRank;
			$previousScore = $currentScore;
		}
	}
}