<?php

use App\Http\Controllers\LeaderboardsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * Public routes
 */
Route::middleware("api.auth-optional")->group(function () {
	Route::prefix("/leaderboards/{urlName}")->group(function ()
	{
		Route::get("/", [LeaderboardsController::class, "getLeaderboardByUrlName"]);
		Route::get("/scores", [LeaderboardsController::class, "getScoresForLeaderboard"]);
	});
});

/*
 * Authenticated routes
 */
Route::middleware(["auth", "api.ensure-user-is-admin"])->group(function ()
{
	Route::get("/me", [UsersController::class, "getMe"]);

	Route::prefix("/users")->group(function ()
	{
		Route::get("/", [UsersController::class, "getUsers"]);
		Route::post("/", [UsersController::class, "createUser"]);

		Route::prefix("/{displayName}")->group(function ()
		{
			Route::patch("/", [UsersController::class, "updateUserByDisplayName"]);
			Route::delete("/", [UsersController::class, "archiveUserByDisplayName"]);
		});
	});

	Route::get("/search/people", [SearchController::class, "searchPeople"]);

	Route::get("/ranking-methods", [LeaderboardsController::class, "getRankingMethods"]);

	Route::prefix("/leaderboards")->group(function ()
	{
		Route::get("/", [LeaderboardsController::class, "getLeaderboards"]);
		Route::post("/", [LeaderboardsController::class, "createLeaderboard"]);

		Route::prefix("/{urlName}")->group(function ()
		{
			Route::patch("/", [LeaderboardsController::class, "updateLeaderboardByUrlName"]);
			Route::delete("/", [LeaderboardsController::class, "archiveLeaderboardByUrlName"]);

			Route::patch("/users/{displayName}/score", [LeaderboardsController::class, "updateLeaderboardScoreForUser"]);
		});
	});
});
