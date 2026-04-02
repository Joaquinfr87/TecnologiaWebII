"use client"

import { useEffect, useMemo, useState } from "react"
import { columns } from "./usuario-columns"
import { DataTable } from "./usuario-data-table"
import {
  FiltrosUsuario,
  filtrosUsuariosSchema,
} from "@/modules/usuario/schemas/usuario.schema"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { usuariosListQueryOptions } from "../services/usuario.queries"
import { PaginationState, SortingState } from "@tanstack/react-table"

interface Props {
  initialFiltros: FiltrosUsuario
}

type ColumnId = "nombre" | "email" | "estado" | "rol"
type TableColumnId = "nombres" | "correoElectronico" | "estado" | "rolId"

const sortMap: Record<TableColumnId, ColumnId> = {
  nombres: "nombre",
  correoElectronico: "email",
  estado: "estado",
  rolId: "rol",
}

const reverseSortMap: Record<ColumnId, TableColumnId> = {
  nombre: "nombres",
  email: "correoElectronico",
  estado: "estado",
  rol: "rolId",
}

export default function UsuarioClient({ initialFiltros }: Props) {
  const router = useRouter()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialFiltros.page - 1,
    pageSize: initialFiltros.perPage,
  })

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (initialFiltros.sortBy) {
      const tableId = reverseSortMap[initialFiltros.sortBy]

      if (tableId) {
        return [
          {
            id: tableId,
            desc: initialFiltros.sortDir === "desc",
          },
        ]
      }
    }
    return []
  })

  const [globalFilter, setGlobalFilter] = useState(
    initialFiltros.search ?? ""
  )
  const [estadoFilter, setEstadoFilter] = useState<string>(
    initialFiltros.estado ?? ""
  )
  const [rolFilter, setRolFilter] = useState<string>(
    initialFiltros.rolId ? String(initialFiltros.rolId) : ""
  )
  const filtros = useMemo(() => {
    const sortId = sorting[0]?.id as TableColumnId | undefined

    const mappedSortBy = sortId ? sortMap[sortId] : undefined

    return filtrosUsuariosSchema.parse({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: globalFilter || undefined,
      estado: estadoFilter || undefined,
      rolId: rolFilter ? Number(rolFilter) : undefined,
      sortBy: mappedSortBy,
      sortDir: sorting[0]
        ? sorting[0].desc
          ? "desc"
          : "asc"
        : undefined,
    })
  }, [pagination, globalFilter, sorting,rolFilter,estadoFilter])

  const { data, isLoading } = useQuery(
    usuariosListQueryOptions(filtros)
  )

  const rows = data?.data ?? []
  const meta = data?.meta

  useEffect(() => {
    const params = new URLSearchParams()

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, String(value))
      }
    })

    const newUrl = `?${params.toString()}`
    const currentUrl = window.location.search

    if (newUrl !== currentUrl) {
      router.replace(newUrl)
    }
  }, [filtros, router])

  const handlePaginationChange = (
    updater: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => {
    setPagination((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    )
  }

  const handleSortingChange = (
    updater: SortingState | ((prev: SortingState) => SortingState)
  ) => {
    setSorting((prev) => {
      const next =
        typeof updater === "function" ? updater(prev) : updater

      setPagination((p) => ({
        ...p,
        pageIndex: 0,
      }))

      return next
    })
  }

  const handleFilterChange = (value: string) => {
    setGlobalFilter(value)

    setPagination((p) => ({
      ...p,
      pageIndex: 0,
    }))
  }

  const handleEstadoChange = (value:string)=>{
    setEstadoFilter(value)

    setPagination((p)=>({
      ...p,pageIndex:0,
    }))
  }
  
  const handleRolChange = (value:string) =>{
    setRolFilter(value)

    setPagination((p)=>({
      ...p,pageIndex:0,
    }))
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={rows}
        pageCount={meta?.last_page ?? 0}

        pagination={pagination}
        setPagination={handlePaginationChange}

        sorting={sorting}
        setSorting={handleSortingChange}

        globalFilter={globalFilter}
        setGlobalFilter={handleFilterChange}

        estadoFilter={estadoFilter}
        setEstadoFilter = {setEstadoFilter}

        rolFilter = {rolFilter}
        setRolFilter = {setRolFilter}

        loading={isLoading}
      />
    </div>
  )
}
