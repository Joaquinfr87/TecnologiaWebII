import { Usuario, FormularioUsuario } from "../schemas/usuario.schema";

//Tambien se puede anadir a futuro el uso de los search params para filtrado de la tabla y usar el Type UsuarioResponse
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export async function fetchUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Fallo al traer Usuarios")
  return res.json()
}
export async function fetchUsuario(id: string): Promise<Usuario> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error("Usuario no encontrado")
  return res.json()
}
export async function createUsuario(data: FormularioUsuario): Promise<Usuario> {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fallo al crear Usuario")
  return res.json()
}
export async function updateUsuario(id:string,data:FormularioUsuario):Promise<Usuario>{
  const res = await fetch(`${API_BASE}/users/${id}`,{
    method:"PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fallo al actualizar Usuario")
  return res.json()
}
export async function deleteUsuario(id:string):Promise<void>{
  const res = await fetch(`${API_BASE}/users/${id}`,{
    method:"DELETE",
  });
  if (!res.ok) throw new Error("Fallo al eliminar Usuario")
}

