<?php

namespace App\Providers;

use App\Services\Auth\AzureTokenValidator;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class AzureTokenValidatorServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(AzureTokenValidator::class, function ($app) {
            return new AzureTokenValidator(
				$app->config['services']['auth']['azure']['client_id'],
				$app->config['services']['auth']['azure']['tenant_id'],
				$app->config['services']['auth']['azure']['discovery_url']
			);
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [AzureTokenValidator::class];
    }
}