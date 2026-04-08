import { apiClient } from "@/lib/api/api-client";
import { TransaccionType, TransaccionesResponseType } from "../schemas/transacciones.schema";
import { FiltrosTransaccion } from "../schemas/transacciones.schema";

export async function fetchTransacciones(filtros?: Partial<FiltrosTransaccion>): Promise<TransaccionesResponseType> {
  const searchParams = new URLSearchParams();

  if (filtros?.search) searchParams.set("search", filtros.search)
  if (filtros?.origen) searchParams.set("origen", "1")
  if (filtros?.destino) searchParams.set("destino", "1")
  if (filtros?.fechaDesde) searchParams.set("fechaDesde", filtros.fechaDesde)
  if (filtros?.fechaHasta) searchParams.set("fechaHasta", filtros.fechaHasta)
  if (filtros?.sortBy) searchParams.set("sortBy", filtros.sortBy)
  if (filtros?.sortDir) searchParams.set("sortDir", filtros.sortDir)
  if (filtros?.perPage) searchParams.set("perPage", String(filtros.perPage))
  if (filtros?.page) searchParams.set("page", String(filtros.page))

  const res = await apiClient(`/transacciones?${searchParams}`);
  if (!res.ok) throw new Error("Fallo al traer transacciones");

  const data = await res.json();
  
  if (data.data && Array.isArray(data.data)) {
    return {
      data: data.data,
      meta: data.meta || {
        current_page: 1,
        last_page: 1,
        per_page: data.data.length,
        total: data.data.length
      }
    };
  }
  
  return {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0
    }
  };
}