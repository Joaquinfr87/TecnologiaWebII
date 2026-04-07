"use client"

import { useEffect, useMemo, useState } from "react"
import { TransaccionesDataTableFull, transaccionesColumns } from "@/modules/transacciones/components/transacciones-data-table-full"
import {
  FiltrosTransaccion,
  filtrosTransaccionesSchema,
} from "@/modules/transacciones/schemas/transacciones.schema"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { transaccionesListQueryOptions } from "@/modules/transacciones/services/transacciones.queries"
import { PaginationState, SortingState } from "@tanstack/react-table"

interface Props {
  initialFiltros: FiltrosTransaccion
}

export default function TransaccionesClient({ initialFiltros }: Props) {
  const router = useRouter()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialFiltros.page - 1,
    pageSize: initialFiltros.perPage,
  })

  const [sorting, setSorting] = useState<SortingState>(() => {
    if (initialFiltros.sortBy) {
      return [{ id: initialFiltros.sortBy, desc: initialFiltros.sortDir === "desc" }]
    }
    return []
  })

  const [globalFilter, setGlobalFilter] = useState(initialFiltros.search ?? "")
  const [cuentaFilter, setCuentaFilter] = useState("")
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(initialFiltros.fechaDesde ?? "")
  const [fechaHastaFilter, setFechaHastaFilter] = useState(initialFiltros.fechaHasta ?? "")

  const filtros = useMemo(() => {
    return filtrosTransaccionesSchema.parse({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      search: globalFilter || undefined,
      cuentaId: cuentaFilter && cuentaFilter !== "all" ? Number(cuentaFilter) : undefined,
      fechaDesde: fechaDesdeFilter || undefined,
      fechaHasta: fechaHastaFilter || undefined,
      sortBy: sorting[0]?.id as "id" | "monto" | "fecha" | undefined,
      sortDir: sorting[0] ? (sorting[0].desc ? "desc" : "asc") : "desc",
    })
  }, [pagination, globalFilter, sorting, cuentaFilter, fechaDesdeFilter, fechaHastaFilter])

  const { data, isLoading } = useQuery(transaccionesListQueryOptions(filtros))

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
    if (newUrl !== window.location.search) {
      router.replace(newUrl)
    }
  }, [filtros, router])

  const handlePaginationChange = (updater: PaginationState | ((prev: PaginationState) => PaginationState)) => {
    setPagination((prev) => (typeof updater === "function" ? updater(prev) : updater))
  }

  const handleSortingChange = (updater: SortingState | ((prev: SortingState) => SortingState)) => {
    setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater
      setPagination((p) => ({ ...p, pageIndex: 0 }))
      return next
    })
  }

  const handleFilterChange = (value: string) => {
    setGlobalFilter(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }

  const handleCuentaChange = (value: string) => {
    setCuentaFilter(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }

  const handleFechaDesdeChange = (value: string) => {
    setFechaDesdeFilter(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }

  const handleFechaHastaChange = (value: string) => {
    setFechaHastaFilter(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10">
          <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transacciones</h1>
          <p className="text-sm text-muted-foreground">Historial completo de transacciones del sistema</p>
        </div>
      </div>

      <div className="w-full">
        <TransaccionesDataTableFull
          columns={transaccionesColumns}
          data={rows}
          pageCount={meta?.last_page ?? 0}
          pagination={pagination}
          setPagination={handlePaginationChange}
          sorting={sorting}
          setSorting={handleSortingChange}
          globalFilter={globalFilter}
          setGlobalFilter={handleFilterChange}
          cuentaFilter={cuentaFilter}
          setCuentaFilter={handleCuentaChange}
          fechaDesdeFilter={fechaDesdeFilter}
          setFechaDesdeFilter={handleFechaDesdeChange}
          fechaHastaFilter={fechaHastaFilter}
          setFechaHastaFilter={handleFechaHastaChange}
          loading={isLoading}
        />
      </div>
    </div>
  )
}