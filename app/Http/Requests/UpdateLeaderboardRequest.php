<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaderboardRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "name" => "required|string|max:100",
            "urlName" => "required|string|max:100|regex:/^[A-Za-z0-9-]+$/",
			"rankingMethodsId" => "required|integer",
			"theme" => "required|string|max:100"
        ];
    }
}
