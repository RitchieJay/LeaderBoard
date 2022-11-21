<?php

namespace App\Models;

use App\Models\Utility\SerializableDateTime;
use stdClass;

class LeaderboardScore
{
	public int $leaderboardScoresId;
	public int $leaderboardsId;
	public string $score;
	public ?int $rank = null;
	public SerializableDateTime $createdAt;
	public User $user;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 * @param bool $includePerson
	 */
	public function __construct(stdClass $data, bool $includePerson = false)
	{
		$this->leaderboardScoresId = $data->leaderboard_scores_id;
		$this->leaderboardsId = $data->leaderboards_id;
		$this->score = $data->score;
		$this->createdAt = SerializableDateTime::fromDateTime($data->created_at);
		$this->user = new User((object)[
			"users_id" => $data->users_id,
			"display_name" => $data->users_display_name,
			"is_admin" => $data->users_is_admin,
			"is_active" => $data->users_is_active,
			"created_at" => $data->users_created_at,
			"people_id" => $data->people_id,
			"people_person_code" => $data->people_person_code,
			"people_forename" => $data->people_forename,
			"people_surname" => $data->people_surname,
			"people_username" => $data->people_username,
			"people_type" => $data->people_type,
			"people_is_active" => $data->people_is_active
		], $includePerson);
	}
}
