<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\Tarifa;
use App\Http\Resources\RolResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    public function index()
    {
        // Excluir el rol Administrador de la lista general
        $roles = Rol::where('Nombre', '!=', 'Administrador')->get();
        return response()->json([
            'data' => RolResource::collection($roles)
        ]);
    }

    public function show($id)
    {
        $rol = Rol::findOrFail($id);
        return new RolResource($rol);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:Rol,Nombre',
            'tarifa' => 'nullable|array',
            'tarifa.monto' => 'required_with:tarifa|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => $validator->errors()
            ], 422);
        }

        $rol = Rol::create([
            'Nombre' => $request->nombre
        ]);

        // Si se envió información de tarifa, la creamos asociada al nuevo rol
        if ($request->has('tarifa')) {
            Tarifa::create([
                'Monto' => $request->input('tarifa.monto'),
                'Estado' => 'Activa',
                'Id_Rol' => $rol->Id_Rol
            ]);
        }

        return response()->json([
            'message' => 'Rol y tarifa creado exitosamente',
            'data' => new RolResource($rol)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $rol = Rol::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:Rol,Nombre,' . $id . ',Id_Rol',
            'tarifa' => 'nullable|array',
            'tarifa.monto' => 'numeric|min:0',
            'tarifa.estado' => 'nullable|string|in:Activa,Inactiva',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $rol->update([
            'Nombre' => $request->nombre
        ]);

        // Actualizar tarifa si se envía
        if ($request->has('tarifa')) {
            $tarifa = $rol->tarifas()->where('Estado', 'Activa')->first();
            $monto = $request->input('tarifa.monto');
            $estado = $request->input('tarifa.estado', 'Activa');

            if ($tarifa) {
                $tarifa->update(array_filter([
                    'Monto' => $monto,
                    'Estado' => $estado,
                ], fn($v) => $v !== null));
            } elseif ($monto !== null) {
                $rol->tarifas()->create([
                    'Monto' => $monto,
                    'Estado' => $estado,
                ]);
            }
        }

        return response()->json([
            'message' => 'Rol actualizado exitosamente',
            'data' => new RolResource($rol)
        ]);
    }

    public function destroy($id)
    {
        // Verificar si hay usuarios con este rol antes de eliminar
        $usersCount = \App\Models\User::where('Id_Rol', $id)->count();
        if ($usersCount > 0) {
            return response()->json([
                'message' => 'No se puede eliminar el rol porque tiene usuarios asignados'
            ], 400);
        }

        $rol = Rol::findOrFail($id);
        
        // Eliminar tarifas asociadas al rol
        $rol->tarifas()->delete();
        
        $rol->delete();

        // Tras eliminar, reiniciamos el AUTO_INCREMENT.
        // prueba o test
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE ' . $rol->getTable() . ' AUTO_INCREMENT = 4');

        return response()->json([
            'message' => 'Rol eliminado correctamente'
        ], 200);
    }
}
