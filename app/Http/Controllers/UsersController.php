<?php

namespace App\Http\Controllers;

use App\Repositories\UsersRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
	private UsersRepository $usersRepo;

	public function __construct(UsersRepository $usersRepo)
	{
		$this->usersRepo = $usersRepo;
	}

	public function getMe(Request $request): JsonResponse
	{
		return response()->json($request->user());
	}

	public function getUsers(Request $request): JsonResponse
	{
		// Fetch the data
		$users = $this->usersRepo->getUsers(
			!!$request->user()
		);

		return response()->json($users);
	}
}
