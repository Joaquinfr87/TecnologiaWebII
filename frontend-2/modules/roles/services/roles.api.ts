import { apiClient } from "@/lib/api/api-client";
import { FormRolType, rolesResponseSchema, RolesResponseType, RolType } from "../schemas/roles.schema";
import { rolSchema } from "@/modules/usuario/schemas/usuario.schema";


export async function fetchRoles(): Promise<RolesResponseType> {
  const res = await apiClient("/roles");
  if (!res.ok) throw new Error("Fallo al traer Roles");
  
  const data = await res.json();
  try {
    return rolesResponseSchema.parse(data);
  } catch (error) {
    console.error("Zod error de validacion en fetchRoles:", error);
    throw error;
  }
}

export async function fetchRol(id: number): Promise<RolType> {
  const res = await apiClient(`/roles/${id}`);
  if (!res.ok) throw new Error("Fallo al traer el Rol");
  
  const data = await res.json();
  return data.data; 
}

export async function createRol(data: FormRolType): Promise<RolType> {
  const res = await apiClient("/roles", {
    method: "POST",
    body: JSON.stringify(data)
  });
  
  if (!res.ok) throw new Error("Fallo al crear Rol");
  
  // 🔴 FIX 1: Evitamos el "Unexpected end of JSON input" leyendo como texto primero
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  // 🔴 FIX 2: Si Laravel devuelve { data: { id: 1, nombre: "..." } }, 
  // Zod fallará si le pasas todo el json. Debemos pasarle json.data
  return rolSchema.parse(json.data ?? json);
}

export async function updateRol(id: number, data: FormRolType): Promise<RolType> {
  const res = await apiClient(`/roles/${id}`, {
    method: "PATCH", // Asegúrate de que tu ruta en Laravel soporte PATCH (apiResource lo hace)
    body: JSON.stringify(data)
  });
  
  if (!res.ok) throw new Error("Fallo al actualizar Rol");
  
  // 🔴 FIX 1: Lectura segura
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  // 🔴 FIX 2: Validación segura de Zod (apuntando a data si existe)
  return rolSchema.parse(json.data ?? json);
}

export async function deleteRol(id: number): Promise<void> {
  const res = await apiClient(`/roles/${id}`, {
    method: "DELETE"
  });
  
  if (!res.ok) throw new Error("Fallo al eliminar Rol");
  
  // En DELETE no retornamos nada, así que solo nos aseguramos de que no explote
  // consumiendo la respuesta silenciosamente por si Laravel envió algo.
  await res.text(); 
}
