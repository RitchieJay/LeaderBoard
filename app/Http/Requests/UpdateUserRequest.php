<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "displayName" => "required|string|max:100|regex:/^[A-Za-z0-9_]+$/",
			"personCode" => "required|integer",
			"isAdmin" => "required|boolean"
        ];
    }
}
