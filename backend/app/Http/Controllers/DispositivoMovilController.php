<?php

namespace App\Http\Controllers;

use App\Models\DispositivoMovil;
use App\Http\Resources\DispositivoMovilResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DispositivoMovilController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => DispositivoMovilResource::collection(DispositivoMovil::all())
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required|exists:Usuario,Id_Usuario',
            'modelo_app' => 'required|string|max:20',
            'marca_modelo' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verificar si ya tiene un dispositivo activo
        $activo = DispositivoMovil::where('Id_Usuario', $request->id_usuario)
                                  ->where('Estado', 'Activo')
                                  ->first();

        if ($activo) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'El usuario ya tiene un dispositivo activo'
            ], 422);
        }

        $dispositivo = DispositivoMovil::create([
            'Id_Usuario' => $request->id_usuario,
            'Modelo_App' => $request->modelo_app,
            'Marca_Modelo' => $request->marca_modelo,
            'Estado' => 'Activo'
        ]);

        return response()->json([
            'status' => 'ok',
            'data' => new DispositivoMovilResource($dispositivo)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $dispositivo = DispositivoMovil::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'estado' => 'required|in:Inactivo,Bloqueado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        $dispositivo->Estado = $request->estado;
        $dispositivo->save();

        return response()->json([
            'status' => 'ok',
            'data' => new DispositivoMovilResource($dispositivo)
        ], 200);
    }

    public function showByUsuario($idUsuario)
    {
        $dispositivo = DispositivoMovil::where('Id_Usuario', $idUsuario)
                                       ->where('Estado', 'Activo')
                                       ->first();
        if (!$dispositivo) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'No se encontró un dispositivo activo para este usuario'
            ], 404);
        }

        return response()->json([
            'status' => 'ok',
            'data' => new DispositivoMovilResource($dispositivo)
        ], 200);
    }
}
