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

	public function getUserByDisplayName(Request $request, string $displayName): JsonResponse
	{
		// Fetch the data
		$user = $this->usersRepo->getUserByDisplayName(
			$displayName,
			!!$request->user()
		);

		// Handle errors
		if (!isset($user)) {
			abort(404, "User not found");
		}

		return response()->json($user);
	}
}
