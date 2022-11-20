<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Repositories\PeopleRepository;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
	private PeopleRepository $peopleRepo;

	public function __construct(PeopleRepository $peopleRepo)
	{
		$this->peopleRepo = $peopleRepo;
	}

	public function searchPeople(SearchRequest $request): JsonResponse
	{
		// Fetch the data
		$people = $this->peopleRepo->searchPeople(
			$request->input("query")
		);

		return response()->json($people);
	}
}
