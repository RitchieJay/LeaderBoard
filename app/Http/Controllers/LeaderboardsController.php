<?php

namespace App\Http\Controllers;

use App\Repositories\LeaderboardsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
}
