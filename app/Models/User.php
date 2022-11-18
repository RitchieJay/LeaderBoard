<?php

namespace App\Models;

use App\Models\Utility\SerializableDateTime;
use Illuminate\Contracts\Auth\Authenticatable;
use stdClass;

class User implements Authenticatable
{
	public int $usersId;
	public string $displayName;
	public bool $isAdmin;
	public SerializableDateTime $createdAt;
	public bool $isActive;
	public ?Person $person;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 * @param bool $includePerson
	 */
	public function __construct(stdClass $data, bool $includePerson = false)
	{
		$this->usersId = $data->users_id;
		$this->displayName = $data->display_name;
		$this->isAdmin = (bool)$data->is_admin;
		$this->createdAt = SerializableDateTime::fromDateTime($data->created_at);
		$this->isActive = (bool)$data->is_active;

		if ($includePerson) {
			$this->person = new Person((object)[
				"id" => $data->people_id,
				"person_code" => $data->people_person_code,
				"forename" => $data->people_forename,
				"surname" => $data->people_surname,
				"username" => $data->people_username,
				"type" => $data->people_type,
				"is_active" => $data->people_is_active,
			]);
		}
	}

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
		return 'person.username';
    }

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->person->username ?? null;
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return null;
    }

    /**
     * Get the "remember me" token value.
     *
     * @return string
     */
    public function getRememberToken()
    {
        return null;
    }

    /**
     * Set the "remember me" token value.
     *
     * @param string $value
     * @return void
     */
    public function setRememberToken($value)
    {
		return;
    }

    /**
     * Get the column name for the "remember me" token.
     *
     * @return string
     */
    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
