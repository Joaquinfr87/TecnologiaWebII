<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Http\Resources\CuentaResource;
use Illuminate\Http\Request;

class CuentaController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CuentaResource::collection(Cuenta::all())
        ], 200);
    }

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

    public function update(Request $request, $id)
    {
        $cuenta = Cuenta::findOrFail($id);

        $validated = $request->validate([
            'saldo' => 'required|numeric|min:0'
        ]);

        $cuenta->Saldo = $validated['saldo'];
        $cuenta->save();

        return response()->json([
            'status' => 'ok',
            'data' => new CuentaResource($cuenta),
            'mensaje' => 'Saldo actualizado correctamente'
        ], 200);
    }

    public function updateSaldo(Request $request, $id)
    {
        $cuenta = Cuenta::findOrFail($id);

        $validated = $request->validate([
            'saldo' => 'required|numeric|min:0'
        ]);

        $cuenta->Saldo = $validated['saldo'];
        $cuenta->save();

        return response()->json([
            'status' => 'ok',
            'data' => new CuentaResource($cuenta),
            'mensaje' => 'Saldo actualizado correctamente'
        ], 200);
    }
}
