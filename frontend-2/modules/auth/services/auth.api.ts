import { LoginForm, RegisterFormType, AuthResponse, authResponseSchema, SessionUser, sessionUserSchema } from "../schemas/auth.schema";
import { Usuario, usuarioSchema } from "../../usuario/schemas/usuario.schema";
import { apiClient } from "@/lib/api/api-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Función auxiliar para obtener el token de forma segura en Next.js (SSR)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

export async function login(data: LoginForm): Promise<AuthResponse> {
  const res = await apiClient("/login", {
    method: "POST",
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Credenciales inválidas");

  const json = await res.json();
  const parsedData = authResponseSchema.parse(json);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", parsedData.access_token);
  }

  return parsedData;
}

export async function register(data: RegisterFormType): Promise<AuthResponse> {
  const payload = {
    ...data,
    fechaNacimiento: new Date(data.fechaNacimiento).toISOString().split("T")[0]
  }
  const res = await apiClient("/register", {
    method: "POST",
    body: JSON.stringify(payload)
  })

  if (!res.ok) throw new Error("Fallo al registrar usuario");

  const json = await res.json();
  const parsedData = authResponseSchema.parse(json);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", parsedData.access_token);
  }

  return parsedData;
}

export async function logout(): Promise<void> {
  const res = await apiClient("/logout", {
    method: "POST"
  })

  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }

  if (!res.ok) throw new Error("Fallo al cerrar sesión en el servidor");
}

export async function fetchCurrentUser(): Promise<SessionUser> {

  if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
    throw new Error("No hay token de sesión");
  }
  const res = await apiClient("/user")

  if (!res.ok) throw new Error("Token inválido o expirado");

  const data = await res.json();
  return sessionUserSchema.parse(data);
}
