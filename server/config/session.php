<?php

use Illuminate\Support\Str;

return [
    'driver' => 'database',
    'lifetime' => 120,
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/sessions'),
    'connection' => env('DB_CONNECTION', 'mysql'), // Use default DB
    'table' => 'sessions',
    'store' => null, // Remove Redis reference
    'lottery' => [2, 100],
    'cookie' => Str::slug(env('APP_NAME', 'laravel'), '_').'_session',
    'path' => '/',
    'domain' => null,
    'secure' => env('SESSION_SECURE_COOKIE', false),
    'http_only' => true,
    'same_site' => 'lax',
    'partitioned' => false,
];