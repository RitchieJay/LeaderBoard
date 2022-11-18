<?php

namespace App\Models;

use App\Models\Utility\SerializableDateTime;
use stdClass;

class Leaderboard
{
	public int $leaderboardsId;
	public string $name;
	public string $urlName;
	public string $theme;
	public SerializableDateTime $createdAt;
	public bool $isActive;
	public RankingMethod $rankingMethod;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 */
	public function __construct(stdClass $data)
	{
		$this->leaderboardsId = $data->leaderboards_id;
		$this->name = $data->name;
		$this->urlName = $data->url_name;
		$this->theme = $data->theme;
		$this->createdAt = SerializableDateTime::fromDateTime($data->created_at);
		$this->isActive = (bool)$data->is_active;
		$this->rankingMethod = new RankingMethod((object)[
			"ranking_methods_id" => $data->ranking_methods_id,
			"reference" => $data->ranking_methods_reference,
			"name" => $data->ranking_methods_name,
			"description" => $data->ranking_methods_description,
			"sort_order" => $data->ranking_methods_sort_order,
		]);
	}
}
