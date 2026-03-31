import { queryOptions } from "@tanstack/react-query"
import { fetchUsuario, fetchUsuarios } from "./usuario.api"
import { FiltrosUsuario } from "../schemas/usuario.schema";

export const usuarioKeys = {
  all: ["usuarios"] as const,
  lists: ()=>[ ...usuarioKeys.all,"list" ] as const,
  list:(filtros:FiltrosUsuario)=>[...usuarioKeys.lists(),filtros] as const,
  details:()=>[ ...usuarioKeys.all,"details" ] as const,
  detail:(id: string)=>[ ...usuarioKeys.details(),id ] as const,
}
export function usuarioQueryOptions(id:string){
  return queryOptions({
    queryKey:usuarioKeys.detail(id),
    queryFn:()=>fetchUsuario(id),
    staleTime: 5*60*1000, //5 minutos
  });
}
export function usuariosListQueryOptions(filtros: FiltrosUsuario = {} ){// => el = {} sirve para decirle si no hay filtros entonces dame vacio y no dara error
  return queryOptions({
    queryKey: usuarioKeys.list(filtros),
    queryFn:()=>fetchUsuarios(filtros),
    staleTime: 60*1000,
  })
}
