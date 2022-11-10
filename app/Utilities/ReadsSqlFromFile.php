<?php

namespace App\Utilities;

use Illuminate\Support\Facades\Storage;

trait ReadsSqlFromFile
{
	/**
	 * Reads in SQL from a file path relative to the database/sql directory.
	 *
	 * @param string $path
	 * @return string
	 */
	protected function sqlFromFile(string $path): string
	{
		// Return the sql file contents
		return Storage::disk('sql')->get($path);
	}
}
