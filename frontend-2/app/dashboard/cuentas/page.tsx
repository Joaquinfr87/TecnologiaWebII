import { getQueryClient } from "@/lib/query-client";
import { fetchCuentas } from "@/modules/cuentas/services/cuentas.api";
import { CuentasDataTable, cuentasColumns } from "@/modules/cuentas/components/cuentas-data-table";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Wallet } from "lucide-react";

export default async function CuentasPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cuentas"],
    queryFn: fetchCuentas,
  });

  const dehydratedState = dehydrate(queryClient);
  const cuentas = dehydratedState.queries[0]?.state?.data?.data ?? [];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Wallet className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cuentas</h1>
          <p className="text-sm text-muted-foreground">Listado de todas las cuentas del sistema</p>
        </div>
      </div>
      <div className="w-full">
        <HydrationBoundary state={dehydratedState}>
          <CuentasDataTable columns={cuentasColumns} data={cuentas} />
        </HydrationBoundary>
      </div>
    </div>
  );
}