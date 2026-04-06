import { apiClient } from "@/lib/api/api-client";
import { Usuario, FormularioUsuario, FiltrosUsuario, UsuarioResponse, usuarioResponseSchema } from "../schemas/usuario.schema";


export async function fetchUsuarios(filtros: FiltrosUsuario): Promise<UsuarioResponse> {
  const searchParams = new URLSearchParams();

  if (filtros.search) searchParams.set("search", filtros.search)
  if (filtros.estado) searchParams.set("estado", filtros.estado)
  if (filtros.rolId) searchParams.set("rolId", String(filtros.rolId))
  if (filtros.sortBy) searchParams.set("sortBy", filtros.sortBy)
  if (filtros.sortDir) searchParams.set("sortDir", filtros.sortDir)
  if (filtros.perPage) searchParams.set("perPage", String(filtros.perPage))
  if (filtros.page) searchParams.set("page", String(filtros.page))

  const res = await apiClient(`/users?${searchParams}`)
  if (!res.ok) throw new Error("Fallo al traer Usuarios")
  const data = await res.json()
  try {
    return usuarioResponseSchema.parse(data)
  }catch(error){
    console.error("Zod error de validacion",error)
    throw error;
  }

}
export async function fetchUsuario(id: string): Promise<Usuario> {
  const res = await apiClient(`/users/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado")
  return res.json()
}
export async function createUsuario(data: FormularioUsuario): Promise<Usuario> {
  const res = await apiClient("/users",{
    method:"POST",
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Fallo al crear Usuario")
  return res.json()
}
export async function updateUsuario(id: string, data: FormularioUsuario): Promise<Usuario> {
  const res = await apiClient(`/users/${id}`,{
    method:"PATCH",
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Fallo al actualizar Usuario")
  return res.json()
}
export async function deleteUsuario(id: string): Promise<void> {
  const res = await apiClient(`/users/${id}`,{
    method:"DELETE"
  })
  if (!res.ok) throw new Error("Fallo al eliminar Usuario")
}

