import { getQueryClient } from "@/lib/query-client";
import { columns} from "./columns"
import { DataTable } from "./data-table"
import { usuariosListQueryOptions } from "@/modules/usuario/services/usuario.queries";


export default async function Page({searchParams}) {
  const params = await searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(usuariosListQueryOptions())

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
