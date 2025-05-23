<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return the authenticated user.
     */
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

}
