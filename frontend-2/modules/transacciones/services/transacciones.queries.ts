import { queryOptions } from "@tanstack/react-query"
import { fetchTransacciones } from "./transacciones.api"
import { FiltrosTransaccion } from "../schemas/transacciones.schema";

export const transaccionesKeys = {
  all: ["transacciones"] as const,
  lists: ()=>[ ...transaccionesKeys.all,"list" ] as const,
  list:(filtros: Partial<FiltrosTransaccion>)=>[...transaccionesKeys.lists(),filtros] as const,
  details:()=>[ ...transaccionesKeys.all,"details" ] as const,
  detail:(id: number)=>[ ...transaccionesKeys.details(),id ] as const,
}

export function transaccionesListQueryOptions(filtros: Partial<FiltrosTransaccion> = {}) {
  return queryOptions({
    queryKey: transaccionesKeys.list(filtros),
    queryFn:()=>fetchTransacciones(filtros),
    staleTime: 60*1000,
  })
}