<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'contrasena' => 'required',
        ]);

        $user = \App\Models\User::where('Correo_Electronico', $request->email)->first();

        if (!$user || !\Illuminate\Support\Facades\Hash::check($request->contrasena, $user->Contrasena)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // Generar token con Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        // Revocar el token actual del usuario
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout exitoso'
        ], 200);
    }
}
