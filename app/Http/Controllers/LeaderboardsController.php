<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateLeaderboardRequest;
use App\Repositories\LeaderboardsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeaderboardsController extends Controller
{
	private LeaderboardsRepository $leaderboardsRepo;

	public function __construct(LeaderboardsRepository $leaderboardsRepo)
	{
		$this->leaderboardsRepo = $leaderboardsRepo;
	}

	public function getRankingMethods(Request $request): JsonResponse
	{
		// Fetch the data
		$rankingMethods = $this->leaderboardsRepo->getRankingMethods();

		return response()->json($rankingMethods);
	}

	public function getLeaderboards(Request $request): JsonResponse
	{
		// Fetch the data
		$leaderboards = $this->leaderboardsRepo->getLeaderboards();

		return response()->json($leaderboards);
	}

	public function createLeaderboard(UpdateLeaderboardRequest $request): JsonResponse
	{
		$leaderboard = DB::transaction(function () use ($request) {
			$requestUser = $request->user();
			$data = $request->validated();

			// Execute the action
			$this->leaderboardsRepo->createLeaderboard(
				$data['name'],
				$data['urlName'],
				$data['rankingMethodsId'],
				$data['theme'],
				$requestUser->person->personCode
			);

			// Fetch the data
			return $this->leaderboardsRepo->getLeaderboardByUrlName(
				$data['urlName']
			);
		});

		return response()->json($leaderboard);
	}

	public function updateLeaderboardByUrlName(UpdateLeaderboardRequest $request, string $urlName): JsonResponse
	{
		$leaderboard = DB::transaction(function () use ($request, $urlName) {
			$requestUser = $request->user();
			$data = $request->validated();

			// Execute the action
			$this->leaderboardsRepo->updateLeaderboardByUrlName(
				$urlName,
				$data['name'],
				$data['urlName'],
				$data['rankingMethodsId'],
				$data['theme'],
				$requestUser->person->personCode
			);

			// Fetch the data
			return $this->leaderboardsRepo->getLeaderboardByUrlName(
				$data['urlName']
			);
		});

		return response()->json($leaderboard);
	}

	public function archiveLeaderboardByUrlName(Request $request, string $urlName): JsonResponse
	{
		$requestUser = $request->user();

		// Execute the action
		$this->leaderboardsRepo->archiveLeaderboardByUrlName(
			$urlName,
			$requestUser->person->personCode
		);

		// Fetch the data
		$leaderboard = $this->leaderboardsRepo->getLeaderboardByUrlName(
			$urlName
		);

		return response()->json($leaderboard);
	}
}
