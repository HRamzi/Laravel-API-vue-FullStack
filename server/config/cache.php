<?php

use Illuminate\Support\Str;

return [
    'default' => 'database',

    'stores' => [
        'database' => [
            'driver' => 'database',
            'connection' => env('DB_CONNECTION', 'mysql'),
            'table' => 'cache',
            'lock_connection' => env('DB_CONNECTION', 'mysql'), // Use same connection
            'lock_table' => 'cache_locks',
        ],

        'array' => [
            'driver' => 'array',
            'serialize' => false,
        ],
    ],

    'prefix' => Str::slug(env('APP_NAME', 'laravel'), '_').'_cache_',
];