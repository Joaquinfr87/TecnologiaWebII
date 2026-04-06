import { getQueryClient } from "@/lib/query-client";
import { fetchTransacciones } from "@/modules/transacciones/services/transacciones.api";
import { TransaccionesDataTable, transaccionesColumns } from "@/modules/transacciones/components/transacciones-data-table";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArrowDownLeft } from "lucide-react";

export default async function TransaccionesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["transacciones"],
    queryFn: fetchTransacciones,
  });

  const dehydratedState = dehydrate(queryClient);
  const transacciones = dehydratedState.queries[0]?.state?.data?.data ?? [];

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
          <TransaccionesDataTable columns={transaccionesColumns} data={transacciones} />
        </HydrationBoundary>
      </div>
    </div>
  );
}