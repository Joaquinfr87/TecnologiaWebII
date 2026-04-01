import { useMemo, useState } from "react";
import { columns } from "./usuario-columns"
import { DataTable } from "./usuario-data-table"
import { FiltrosUsuario, filtrosUsuariosSchema } from "@/modules/usuario/schemas/usuario.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { usuariosListQueryOptions } from "../services/usuario.queries";
import { Parastoo } from "next/font/google";

interface Props{
  initialFiltros:FiltrosUsuario
}

export default function UsuarioClient({initialFiltros}:Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [pagination,setPagination] = useState({
    pageIndex: initialFiltros.page-1,
    pageSize: initialFiltros.perPage,
  })

  const [sorting, setSorting] = useState(()=>{
    initialFiltros.sortBy?[
      {
        id:initialFiltros.sortBy,
        desc:initialFiltros.sortDir==="desc"
      },
    ]:[]
  })

  const [globalFilter,setGlobalFilter] = useState(
    initialFiltros.search??""
  )

  const filtros = useMemo(()=>{
    return filtrosUsuariosSchema.parse({
      page: pagination.pageIndex +1,
      perPage: pagination.pageSize,
      search: globalFilter || undefined,
      sortBy: sorting[0]?.id,
      sortDir: sorting[0]?.desc ? "desc":"asc",
    })
    },[pagination,globalFilter,sorting])

  const {data, isLoading} = useQuery(usuariosListQueryOptions(filtros))

  const rows = data?.data??[]
  const meta = data?.meta

  const updateUrl=(next:FiltrosUsuario)=>{
    const params = new URLSearchParams();

    Object.entries(next).forEach(([key,value])=>{
      if(value !== undefined){
        params.set(key,String(value))
      }
    })
    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
