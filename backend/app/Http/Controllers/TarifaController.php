<?php

namespace App\Http\Controllers;

use App\Models\Tarifa;
use App\Http\Resources\TarifaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarifaController extends Controller
{
    public function index()
    {
        return TarifaResource::collection(Tarifa::all());
    }

    public function show($id)
    {
        $tarifa = Tarifa::findOrFail($id);
        return new TarifaResource($tarifa);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'monto' => 'required|numeric|min:0',
            'estado' => 'sometimes|in:Activa,Inactiva',
            'rolId' => 'required|exists:Rol,Id_Rol',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        $tarifa = Tarifa::create([
            'Monto' => $request->monto,
            'Estado' => $request->get('estado', 'Activa'),
            'Id_Rol' => $request->rolId,
        ]);

        return response()->json([
            'status' => 'ok',
            'data' => new TarifaResource($tarifa)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $tarifa = Tarifa::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'monto' => 'sometimes|numeric|min:0',
            'estado' => 'sometimes|in:Activa,Inactiva',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Invalid data',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('monto')) {
            $tarifa->Monto = $request->monto;
        }
        if ($request->has('estado')) {
            $tarifa->Estado = $request->estado;
        }
        $tarifa->save();

        return response()->json([
            'status' => 'ok',
            'data' => new TarifaResource($tarifa)
        ], 200);
    }

    public function destroy($id)
    {
        $tarifa = Tarifa::findOrFail($id);
        $tarifa->delete();

        return response()->json([
            'status' => 'ok',
            'mensaje' => 'Tarifa eliminada correctamente'
        ], 200);
    }
}
