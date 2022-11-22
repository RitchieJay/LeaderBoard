<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetUsersRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\UsersRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

	public function getUsers(GetUsersRequest $request): JsonResponse
	{
		$data = $request->validated();

		// Fetch the data
		$users = $this->usersRepo->getUsers(
			!!$request->user(),
			(bool)$data['includeInactive']
		);

		return response()->json($users);
	}

	public function createUser(UpdateUserRequest $request): JsonResponse
	{
		$user = DB::transaction(function () use ($request) {
			$requestUser = $request->user();
			$data = $request->validated();

			// Execute the action
			$this->usersRepo->createUser(
				$data['displayName'],
				$data['personCode'],
				(bool)$data['isAdmin'],
				$requestUser->person->personCode
			);

			// Fetch the data
			return $this->usersRepo->getUserByDisplayName(
				$data['displayName'],
				!!$requestUser
			);
		});

		return response()->json($user);
	}

	public function updateUserByDisplayName(UpdateUserRequest $request, string $displayName): JsonResponse
	{
		$user = DB::transaction(function () use ($request, $displayName) {
			$requestUser = $request->user();
			$data = $request->validated();

			// Execute the action
			$this->usersRepo->updateUserByDisplayName(
				$displayName,
				$data['displayName'],
				$data['personCode'],
				(bool)$data['isAdmin'],
				$requestUser->person->personCode
			);

			// Fetch the data
			return $this->usersRepo->getUserByDisplayName(
				$data['displayName'],
				!!$requestUser
			);
		});

		return response()->json($user);
	}

	public function archiveUserByDisplayName(Request $request, string $displayName): JsonResponse
	{
		$requestUser = $request->user();

		// Execute the action
		$this->usersRepo->archiveUserByDisplayName(
			$displayName,
			$requestUser->person->personCode
		);

		// Fetch the data
		$user = $this->usersRepo->getUserByDisplayName(
			$displayName,
			!!$requestUser
		);

		return response()->json($user);
	}
}
