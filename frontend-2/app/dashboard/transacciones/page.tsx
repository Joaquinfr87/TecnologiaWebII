import { getQueryClient } from "@/lib/query-client";
import { fetchTransacciones } from "@/modules/transacciones/services/transacciones.api";
import { FiltrosTransaccion } from "@/modules/transacciones/schemas/transacciones.schema";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArrowDownLeft } from "lucide-react";
import TransaccionesClient from "./client";

export default async function TransaccionesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filtros: FiltrosTransaccion = {
    search: typeof params.search === "string" ? params.search : undefined,
    cuentaId: params.cuentaId ? Number(params.cuentaId) : undefined,
    fechaDesde: typeof params.fechaDesde === "string" ? params.fechaDesde : undefined,
    fechaHasta: typeof params.fechaHasta === "string" ? params.fechaHasta : undefined,
    sortBy: params.sortBy as "id" | "monto" | "fecha" | undefined,
    sortDir: (params.sortDir as "asc" | "desc") || "desc",
    perPage: params.perPage ? Number(params.perPage) : 10,
    page: params.page ? Number(params.page) : 1,
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["transacciones", "list", filtros],
    queryFn: () => fetchTransacciones(filtros),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10">
          <ArrowDownLeft className="h-6 w-6 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transacciones</h1>
          <p className="text-sm text-muted-foreground">Historial completo de transacciones del sistema</p>
        </div>
      </div>
      <div className="w-full">
        <HydrationBoundary state={dehydratedState}>
          <TransaccionesClient initialFiltros={filtros} />
        </HydrationBoundary>
      </div>
    </div>
  );
}