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

Route::middleware("auth")->group(function ()
{
	Route::get("/me", [UsersController::class, 'getMe']);

	Route::prefix('/users')->middleware('api.ensure-user-is-admin')->group(function ()
	{
		Route::get('/', [UsersController::class, 'getUsers']);
		Route::post('/', [UsersController::class, 'createUser']);

		Route::prefix('/{displayName}')->group(function ()
		{
			Route::get('/', [UsersController::class, 'getUserByDisplayName']);
			Route::patch('/', [UsersController::class, 'updateUserByDisplayName']);
			Route::delete('/', [UsersController::class, 'archiveUserByDisplayName']);
		});
	});

	Route::get('/search/people', [SearchController::class, 'searchPeople'])->middleware('api.ensure-user-is-admin');

	Route::get("/ranking-methods", [LeaderboardsController::class, 'getRankingMethods']);
});
