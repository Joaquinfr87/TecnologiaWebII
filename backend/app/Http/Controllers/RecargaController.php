<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Models\Transaccion;
use App\Http\Resources\CuentaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RecargaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_cuenta_destino' => 'required|exists:Cuenta,Id_Cuenta',
            'monto' => 'required|numeric|min:0.01',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Datos invalidos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $cuenta = Cuenta::findOrFail($request->id_cuenta_destino);
            $cuenta->Saldo += $request->monto;
            $cuenta->save();

            Transaccion::create([
                'Id_Cuenta_Origen' => null,
                'Id_Cuenta_Destino' => $cuenta->Id_Cuenta,
                'UID_NFC' => null,
                'Id_Dispositivo_Origen' => null,
                'Id_Dispositivo_Destino' => null,
                'Monto' => $request->monto,
                'Tipo' => 'Recarga_Saldo',
            ]);

            DB::commit();

            return response()->json([
                'status' => 'ok',
                'data' => new CuentaResource($cuenta)
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Error al procesar la recarga',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
