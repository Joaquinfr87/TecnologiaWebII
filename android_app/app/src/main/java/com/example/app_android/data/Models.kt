package com.example.app_android.data

import com.google.gson.annotations.SerializedName

// Respuesta del Usuario desde Laravel (PascalCase en la BD)
data class UserResponse(
    @SerializedName("Id_Usuario") val id: Int,
    @SerializedName("Nombres") val nombres: String,
    @SerializedName("Apellidos") val apellidos: String,
    @SerializedName("Carnet_Identidad") val carnet: String,
    @SerializedName("Correo_Electronico") val email: String,
    @SerializedName("Fecha_Nacimiento") val fechaNacimiento: String?,
    @SerializedName("Id_Rol") val rolId: Int,
    @SerializedName("Estado") val estado: String
)

// Request para Login
data class LoginRequest(
    val email: String,
    val contrasena: String
)

// Respuesta de Login
data class LoginResponse(
    @SerializedName("access_token") val accessToken: String,
    @SerializedName("token_type") val tokenType: String,
    @SerializedName("user") val user: UserResponse
)

// Request para Registro (basado en UserController@store)
data class RegisterRequest(
    val nombres: String,
    val apellidos: String,
    val carnetIdentidad: String,
    val correoElectronico: String,
    val fechaNacimiento: String,
    val contrasena: String?,
    val rolId: Int
)
