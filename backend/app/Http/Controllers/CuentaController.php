<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Http\Resources\CuentaResource;

class CuentaController extends Controller
{
    public function show($id)
    {
        $cuenta = Cuenta::findOrFail($id);
        
        return response()->json([
            'status' => 'ok',
            'data' => new CuentaResource($cuenta)
        ], 200);
    }

    public function showByUsuario($idUsuario)
    {
        $cuenta = Cuenta::where('Id_Usuario', $idUsuario)->first();

        if (!$cuenta) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Cuenta no encontrada para este usuario'
            ], 404);
        }

        return response()->json([
            'status' => 'ok',
            'data' => new CuentaResource($cuenta)
        ], 200);
    }
}
