import { getQueryClient } from "@/lib/query-client";
import { fetchDispositivos } from "@/modules/dispositivos/services/dispositivos.api";
import { DispositivosDataTable, dispositivosColumns } from "@/modules/dispositivos/components/dispositivos-data-table";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Smartphone } from "lucide-react";

export default async function DispositivosPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dispositivos"],
    queryFn: fetchDispositivos,
  });

  const dehydratedState = dehydrate(queryClient);
  const dispositivos = dehydratedState.queries[0]?.state?.data?.data ?? [];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-500/10">
          <Smartphone className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dispositivos</h1>
          <p className="text-sm text-muted-foreground">Listado de dispositivos móviles registrados</p>
        </div>
      </div>
      <div className="w-full">
        <HydrationBoundary state={dehydratedState}>
          <DispositivosDataTable columns={dispositivosColumns} data={dispositivos} />
        </HydrationBoundary>
      </div>
    </div>
  );
}