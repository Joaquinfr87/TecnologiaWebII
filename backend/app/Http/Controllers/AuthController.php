<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nombres'            => 'required|string|max:100',
            'apellidos'          => 'required|string|max:100',
            'carnetIdentidad'    => 'required|string|max:20|unique:Usuario,Carnet_Identidad',
            'correoElectronico'  => 'required|email|unique:Usuario,Correo_Electronico',
            'fechaNacimiento'    => 'required|date',
            'contrasena'         => 'required|string|min:6',
            'rolId'              => 'required|integer|exists:Rol,Id_Rol',
        ]);

        $user = User::create([
            'Nombres'            => $request->nombres,
            'Apellidos'          => $request->apellidos,
            'Carnet_Identidad'   => $request->carnetIdentidad,
            'Correo_Electronico' => $request->correoElectronico,
            'Fecha_Nacimiento'   => $request->fechaNacimiento,
            'Contrasena'         => Hash::make($request->contrasena),
            'Id_Rol'             => $request->rolId,
            'Estado'             => 'Activo',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'Usuario registrado correctamente.',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'    => $user->Id_Usuario,
                'name'  => trim($user->Nombres . ' ' . $user->Apellidos),
                'email' => $user->Correo_Electronico,
                'role'  => $user->Id_Rol,
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'contrasena' => 'required',
        ]);

        $user = User::where('Correo_Electronico', $request->email)->first();

        if (!$user || !Hash::check($request->contrasena, $user->Contrasena)) {
            return response()->json([
                'message' => 'Las credenciales proporcionadas son incorrectas.'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->Id_Usuario,
                'name' => trim($user->Nombres . ' ' . $user->Apellidos),
                'email' => $user->Correo_Electronico,
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente y token invalidado.'
        ], 200);
    }
}
