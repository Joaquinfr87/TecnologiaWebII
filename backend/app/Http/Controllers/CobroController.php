<?php

namespace App\Http\Controllers;

use App\Models\TarjetaNFC;
use App\Models\Cuenta;
use App\Models\Tarifa;
use App\Models\Transaccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CobroController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uid_nfc' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // 1. Buscar TarjetaNFC por uid_nfc
            $tarjeta = TarjetaNFC::where('UID_NFC', $request->uid_nfc)->first();
            if (!$tarjeta) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'Tarjeta NFC no encontrada'
                ], 404);
            }

            // 2. Verificar Estado == 'Activa'
            if ($tarjeta->Estado !== 'Activa') {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'La tarjeta NFC no se encuentra activa'
                ], 422);
            }

            // 3. Obtener el Usuario dueño de la tarjeta (estudiante)
            $estudiante = $tarjeta->usuario;
            if (!$estudiante) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'Usuario no encontrado para esta tarjeta'
                ], 404);
            }

            // 4. Obtener Cuenta del estudiante
            $cuentaEstudiante = $estudiante->cuenta;
            if (!$cuentaEstudiante) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'El estudiante no tiene una cuenta asociada'
                ], 422);
            }

            // 5. Obtener Rol del estudiante y 6. Buscar Tarifa para ese Id_Rol donde Estado='Activa'
            $tarifa = Tarifa::where('Id_Rol', $estudiante->Id_Rol)
                            ->where('Estado', 'Activa')
                            ->first();

            if (!$tarifa) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'No hay una tarifa activa configurada para el rol del estudiante'
                ], 422);
            }

            // 7. Verificar Cuenta.Saldo >= Tarifa.Monto
            if ($cuentaEstudiante->Saldo < $tarifa->Monto) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'Saldo insuficiente'
                ], 422);
            }

            // 8. Obtener Cuenta del chofer: auth()->user()->cuenta
            $chofer = $request->user();
            $cuentaChofer = $chofer->cuenta;

            if (!$cuentaChofer) {
                return response()->json([
                    'status' => 'error',
                    'mensaje' => 'El chofer no tiene una cuenta configurada'
                ], 422);
            }

            // 9. Obtener Dispositivo del chofer
            $dispositivoChofer = $chofer->dispositivosMoviles()
                                        ->where('Estado', 'Activo')
                                        ->first();

            $idDispositivoDestino = $dispositivoChofer ? $dispositivoChofer->Id_Dispositivo : null;

            // 10. Descontar Tarifa.Monto de Cuenta del estudiante
            $cuentaEstudiante->Saldo -= $tarifa->Monto;
            $cuentaEstudiante->save();

            // 11. Sumar Tarifa.Monto a Cuenta del chofer
            $cuentaChofer->Saldo += $tarifa->Monto;
            $cuentaChofer->save();

            // 12. Registrar Transaccion tipo 'Pago_Pasaje'
            Transaccion::create([
                'Id_Cuenta_Origen' => $cuentaEstudiante->Id_Cuenta,
                'Id_Cuenta_Destino' => $cuentaChofer->Id_Cuenta,
                'UID_NFC' => $tarjeta->UID_NFC,
                'Id_Dispositivo_Origen' => null,
                'Id_Dispositivo_Destino' => $idDispositivoDestino,
                'Monto' => $tarifa->Monto,
                'Tipo' => 'Pago_Pasaje',
            ]);

            DB::commit();

            // 13. Retornar JSON
            return response()->json([
                'status' => 'ok',
                'mensaje' => 'Cobro exitoso',
                'estudiante' => trim($estudiante->Nombres . ' ' . $estudiante->Apellidos),
                'monto_cobrado' => $tarifa->Monto,
                'saldo_restante' => $cuentaEstudiante->Saldo
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Ocurrio un error al procesar el cobro',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
