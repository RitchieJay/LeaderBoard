<?php

namespace App\Models\Auth;

use App\Models\Utility\SerializableDateTime;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;
use stdClass;

class LoggedInUser implements Authenticatable
{
	public int $usersId;
	public int $personCode;
	public string $displayName;
	public bool $isAdmin;
	public SerializableDateTime $createdAt;
	public bool $isActive;
	public string $privateId;
	public string $privateForename;
	public string $privateSurname;
	public string $privateUsername;

	/**
	 * Constructs an instance of the model with the given data.
	 *
	 * @param stdClass $data
	 */
	public function __construct(stdClass $data)
	{
		$this->usersId = $data->users_id;
		$this->personCode = $data->person_code;
		$this->displayName = $data->display_name;
		$this->isAdmin = (bool)$data->is_admin;
		$this->createdAt = SerializableDateTime::fromDateTime($data->created_at);
		$this->isActive = (bool)$data->is_active;
		$this->privateId = $data->private_id;
		$this->privateForename = $data->private_forename;
		$this->privateSurname = $data->private_surname;
		$this->privateUsername = $data->private_username;
	}

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
		return 'private_username';
    }

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->{Str::camel($this->getAuthIdentifierName())};
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
