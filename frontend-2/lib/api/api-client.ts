const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // 1. EL WRAPPER A LA IDA: Inyecta el token si existe
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Ejecutamos la petición real
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // 2. EL WRAPPER A LA VUELTA: Intercepta errores globales (como el 401)
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      // ¡AQUÍ ESTÁ LA SOLUCIÓN! Borramos el token inválido/expirado
      localStorage.removeItem("auth_token");
      
      // Expulsamos al usuario al login inmediatamente recargando la página.
      // (Usamos window.location porque estamos fuera del ecosistema de React/Next Router)
      if (window.location.pathname !== '/login') {
         window.location.href = "/login";
      }
    }
  }

  return response;
}
