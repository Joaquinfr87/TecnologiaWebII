<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        return response()->json([
            'id' => $user->Id_Usuario,
            'name' => trim($user->Nombres . ' ' . $user->Apellidos),
            'email' => $user->Correo_Electronico,
            'role' => $user->Id_Rol
        ]);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::apiResource('users', UserController::class);

Route::apiResource('roles', RolController::class);
