import { getQueryClient } from "@/lib/query-client";
import UsuarioClient from "@/modules/usuario/components/usuario-client";
import { FiltrosUsuario, filtrosUsuariosSchema } from "@/modules/usuario/schemas/usuario.schema";
import { usuariosListQueryOptions } from "@/modules/usuario/services/usuario.queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";


interface UsuarioPageProps {
  searchParams: Promise<FiltrosUsuario>;
}
export default async function Page({ searchParams }: UsuarioPageProps) {
  const params = await searchParams;
  const queryClient = getQueryClient();
  const filtrosLimpios = filtrosUsuariosSchema.parse(params);

  await queryClient.prefetchQuery(usuariosListQueryOptions(
    filtrosLimpios
  ))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsuarioClient initialFiltros={filtrosLimpios} />
    </HydrationBoundary>
  )
}
