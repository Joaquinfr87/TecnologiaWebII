<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TarifaController;
use App\Http\Controllers\TarjetaNFCController;
use App\Http\Controllers\DispositivoMovilController;
use App\Http\Controllers\CuentaController;
use App\Http\Controllers\RecargaController;
use App\Http\Controllers\CobroController;
use App\Http\Controllers\TransaccionController;

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

    // Rutas protegidas
    Route::post('/cobro', [CobroController::class, 'store']);
});

Route::apiResource('users', UserController::class);

Route::apiResource('roles', RolController::class);

// Rutas públicas base
Route::apiResource('tarifas', TarifaController::class);
Route::apiResource('tarjetas-nfc', TarjetaNFCController::class)->parameters([
    'tarjetas-nfc' => 'uid'
]);

// Cuentas - listados generales
Route::apiResource('cuentas', CuentaController::class);

// Transacciones - listados generales  
Route::apiResource('transacciones', TransaccionController::class);

// Dispositivos - listados generales
Route::apiResource('dispositivos', DispositivoMovilController::class)->only(['index', 'show']);

// Cuentas y Recargas
Route::get('/usuarios/{id}/cuenta', [CuentaController::class, 'showByUsuario']);
Route::post('/recargas', [RecargaController::class, 'store']);

// Dispositivos
Route::post('/dispositivos', [DispositivoMovilController::class, 'store']);
Route::put('/dispositivos/{id}', [DispositivoMovilController::class, 'update']);
Route::get('/usuarios/{id}/dispositivo', [DispositivoMovilController::class, 'showByUsuario']);
Route::get('/usuarios/{id}/transacciones', [TransaccionController::class, 'showByUsuario']);
