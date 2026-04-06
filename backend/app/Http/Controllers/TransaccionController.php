<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Models\Transaccion;
use App\Http\Resources\TransaccionResource;
use Illuminate\Http\Request;

class TransaccionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TransaccionResource::collection(
                Transaccion::orderBy('Fecha', 'desc')->get()
            )
        ], 200);
    }

    public function showByUsuario($idUsuario)
    {
        // Encontrar la cuenta del usuario
        $cuenta = Cuenta::where('Id_Usuario', $idUsuario)->first();

        if (!$cuenta) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Cuenta no encontrada para este usuario'
            ], 404);
        }

        // Obtener transacciones relacionadas a esta cuenta
        $transacciones = Transaccion::where('Id_Cuenta_Origen', $cuenta->Id_Cuenta)
            ->orWhere('Id_Cuenta_Destino', $cuenta->Id_Cuenta)
            ->orderBy('Fecha', 'desc')
            ->get();

        return response()->json([
            'status' => 'ok',
            'data' => TransaccionResource::collection($transacciones)
        ], 200);
    }
}
