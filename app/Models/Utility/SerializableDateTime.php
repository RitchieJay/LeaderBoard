<?php

namespace App\Models\Utility;

use Carbon\Carbon;
use DateTime;
use JsonSerializable;

class SerializableDateTime extends Carbon implements JsonSerializable
{
	const DATE_FORMAT = "Y-m-d";

	public function jsonSerialize()
	{
		return $this->format("H:i:s.u") === "00:00:00.000000" ?
			$this->format(static::DATE_FORMAT) :
			$this->toISOString();
	}

	public static function fromDateTime(DateTime $date)
	{
		return SerializableDateTime::instance($date);
	}
}
