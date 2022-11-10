<?php

namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Services\Auth\AzureGuard;
use App\Services\Auth\AzureTokenValidator;
use App\Services\Auth\DbUserProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

		Auth::provider('db', function ($app) {
            return new DbUserProvider(
				$app->make(AuthRepository::class)
			);
        });

        Auth::extend('azure', function ($app, $name, array $config) {
            return new AzureGuard(
				Auth::createUserProvider($config['provider']),
				$app->request,
				$app->make(AzureTokenValidator::class),
			);
        });
    }
}
