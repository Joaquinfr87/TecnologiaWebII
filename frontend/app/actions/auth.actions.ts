'use server'

import { cookies } from "next/headers"

export async function loginAction(data: { email: string; contrasena: string }) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.contrasena
    }
    )
  }
  )
  console.log("Código de estado HTTP de Laravel:", response.status);
  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.message || "Error al iniciar sesion" }
  }
  const result = await response.json()

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth_token',
    value: result.access_token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });

  return { success: true }
}
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    // 1. Si hay un token, le pedimos a Laravel que lo revoque en la base de datos
    if (token) {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` // Es vital enviar el token
        }
      });
    }

    // 2. Independientemente de si Laravel respondió bien o falló (ej. servidor apagado),
    // destruimos la cookie localmente para proteger al usuario en el frontend.
    cookieStore.delete('auth_token');

    return { success: true };
  } catch (error) {
    console.error("Error crítico al cerrar sesión:", error);
    // Si algo falla a nivel de red, igual intentamos borrar la cookie
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    
    return { error: "Error de red al cerrar sesión" };
  }
}
