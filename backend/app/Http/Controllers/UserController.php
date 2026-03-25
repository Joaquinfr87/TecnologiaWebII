<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * 1.1 Listar (index) - Soporta búsqueda, filtros y paginación
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Búsqueda general (nombres, apellidos, carnet)
        // CAMBIO: Usamos los nombres de columnas de tu BD (Mayúsculas)
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('Nombres', 'like', "%{$search}%")
                  ->orWhere('Apellidos', 'like', "%{$search}%")
                  ->orWhere('Carnet_Identidad', 'like', "%{$search}%")
                  ->orWhere('Correo_Electronico', 'like', "%{$search}%");
            });
        }

        // Filtros específicos
        if ($request->has('estado')) {
            $query->where('Estado', $request->estado);
        }

        if ($request->has('rolId')) {
            $query->where('Id_Rol', $request->rolId);
        }

        // Ordenamiento
        // CAMBIO: Si el frontend manda 'id', lo traducimos a 'Id_Usuario' para la BD.
        // Si no, usamos el campo que mande, asegurando la primera letra en mayúscula
        $sortByInput = $request->get('sortBy', 'id');
        $sortBy = $sortByInput === 'id' ? 'Id_Usuario' : ucfirst($sortByInput);
        
        // Manejo especial si el frontend pide ordenar por rolId o carnetIdentidad
        if ($sortByInput === 'rolId') $sortBy = 'Id_Rol';
        if ($sortByInput === 'carnetIdentidad') $sortBy = 'Carnet_Identidad';

        $sortDir = $request->get('sortDir', 'asc');
        $query->orderBy($sortBy, $sortDir);

        // Paginación
        $perPage = $request->get('perPage', 10);
        $users = $query->paginate($perPage);

        return UserResource::collection($users);
    }

    /**
     * 1.2 Obtener uno (show)
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    /**
     * 1.3 Crear (store)
     */
    public function store(Request $request)
    {
        // CAMBIO: Validaciones apuntando a tus tablas y columnas reales
        $validator = Validator::make($request->all(), [
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'carnetIdentidad' => 'required|unique:Usuario,Carnet_Identidad', // Apunta a tabla 'Usuario'
            'correoElectronico' => 'required|email|unique:Usuario,Correo_Electronico',
            'fechaNacimiento' => 'required|date',
            'contrasena' => 'nullable|min:6', // CAMBIO: nullable por los estudiantes
            'rolId' => 'required|exists:Rol,Id_Rol', // Apunta a tabla 'Rol'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // CAMBIO: Keys del array en mayúsculas como en tu BD
        $user = User::create([
            'Nombres' => $request->nombres,
            'Apellidos' => $request->apellidos,
            'Carnet_Identidad' => $request->carnetIdentidad,
            'Correo_Electronico' => $request->correoElectronico,
            'Fecha_Nacimiento' => $request->fechaNacimiento,
            'Contrasena' => $request->contrasena ? Hash::make($request->contrasena) : null,
            'Id_Rol' => $request->rolId,
            'Estado' => 'Activo',
        ]);

        return (new UserResource($user))
                ->response()
                ->setStatusCode(201);
    }

    /**
     * 1.4 Actualizar (update)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nombres' => 'sometimes|string|max:100',
            'apellidos' => 'sometimes|string|max:100',
            'carnetIdentidad' => 'sometimes|unique:Usuario,Carnet_Identidad,' . $id . ',Id_Usuario',
            'correoElectronico' => 'sometimes|email|unique:Usuario,Correo_Electronico,' . $id . ',Id_Usuario',
            'fechaNacimiento' => 'sometimes|date',
            'rolId' => 'sometimes|exists:Rol,Id_Rol',
            'estado' => 'sometimes|in:Activo,Inactivo',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422);
        }

        // CAMBIO: Actualizamos usando las columnas reales de la BD
        $user->update([
            'Nombres' => $request->get('nombres', $user->Nombres),
            'Apellidos' => $request->get('apellidos', $user->Apellidos),
            'Carnet_Identidad' => $request->get('carnetIdentidad', $user->Carnet_Identidad),
            'Correo_Electronico' => $request->get('correoElectronico', $user->Correo_Electronico),
            'Fecha_Nacimiento' => $request->get('fechaNacimiento', $user->Fecha_Nacimiento),
            'Id_Rol' => $request->get('rolId', $user->Id_Rol),
            'Estado' => $request->get('estado', $user->Estado),
        ]);

        // Si mandan nueva contraseña, la actualizamos
        if ($request->filled('contrasena')) {
             $user->update(['Contrasena' => Hash::make($request->contrasena)]);
        }

        return new UserResource($user);
    }

    /**
     * 1.5 Eliminar (destroy)
     */
    public function destroy($id)
    {
        //borrado físico:
        //$user = User::findOrFail($id);
        // $user->update(['Estado' => 'Inactivo']); 
        //$user->delete();
        //return response()->json([
        //    'message' => 'Usuario eliminado correctamente'
        //], 200);



        // Borrado suave simulado (Soft Delete manual):
        $user = User::findOrFail($id);
        $user->update([
            'Estado' => 'Inactivo'
        ]);
        // Retornamos EXACTAMENTE lo que pide el contrato JSON
        return response()->json([
            'message' => 'Usuario eliminado correctamente'
        ], 200);
    }
}