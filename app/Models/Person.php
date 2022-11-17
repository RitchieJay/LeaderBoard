<?php

namespace App\Models;

use stdClass;

class Person
{
	public string $id;
	public int $personCode;
	public string $forename;
	public string $surname;
	public string $username;
	public string $type;
	public bool $isActive;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 */
	public function __construct(stdClass $data)
	{
		$this->id = $data->id;
		$this->personCode = $data->person_code;
		$this->forename = $data->forename;
		$this->surname = $data->surname;
		$this->username = $data->username;
		$this->type = $data->type;
		$this->isActive = (bool)$data->is_active;
	}
}
