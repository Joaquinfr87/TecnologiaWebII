<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Http\Resources\RolResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => RolResource::collection(Rol::all())
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        $rol = Rol::create([
            'Nombre' => $request->nombre
        ]);

        return response()->json([
            'message' => 'Rol creado exitosamente',
            'data' => new RolResource($rol)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $rol = Rol::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:Rol,Nombre,' . $id . ',Id_Rol',
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
        $rol->delete();

        return response()->json([
            'message' => 'Rol eliminado correctamente'
        ], 200);
    }
}
