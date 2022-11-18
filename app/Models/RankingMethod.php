<?php

namespace App\Models;

use stdClass;

class RankingMethod
{
	public int $rankingMethodsId;
	public string $reference;
	public string $name;
	public string $description;
	public int $sortOrder;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 */
	public function __construct(stdClass $data)
	{
		$this->rankingMethodsId = $data->ranking_methods_id;
		$this->reference = $data->reference;
		$this->name = $data->name;
		$this->description = $data->description;
		$this->sortOrder = $data->sort_order;
	}
}
