"use client"

import { useEffect, useMemo, useState } from "react"
import { columns } from "./usuario-columns"
import { DataTable } from "./usuario-data-table"
import SheetUsuario from "./usuario-sheet"
import {
  FiltrosUsuario,
  filtrosUsuariosSchema,
} from "@/modules/usuario/schemas/usuario.schema"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { usuariosListQueryOptions } from "../services/usuario.queries"
import { PaginationState, SortingState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

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
  const searchParams = useSearchParams()

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
      estado: estadoFilter && estadoFilter !== "all" ? estadoFilter : undefined,
      rolId: rolFilter && rolFilter !== "all" ? Number(rolFilter) : undefined,
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
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-sm text-muted-foreground">Gestión de usuarios del sistema</p>
          </div>
        </div>
        <Button onClick={() => router.push("?usuarioId=new")}>
          <Plus className="h-4 w-4 mr-2" />
          Crear Usuario
        </Button>
      </div>
      <div className="w-full">
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
          setEstadoFilter={setEstadoFilter}

          rolFilter={rolFilter}
          setRolFilter={setRolFilter}

          loading={isLoading}
        />
      </div>
      <SheetUsuario />
    </div>
  )
}
