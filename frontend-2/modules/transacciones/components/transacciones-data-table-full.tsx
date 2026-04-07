"use client"

import { useState, useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { TransaccionType } from "../schemas/transacciones.schema"

export const transaccionesColumns: ColumnDef<TransaccionType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">#{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "monto",
    header: "Monto",
    cell: ({ row }) => {
      const monto = row.getValue("monto") as number
      return <span className="font-semibold text-emerald-600">Bs. {monto.toFixed(2)}</span>
    },
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const fecha = row.getValue("fecha") as string
      const date = new Date(fecha)
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{date.toLocaleDateString("es-BO")}</span>
          <span className="text-xs text-muted-foreground">
            {date.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "idCuentaOrigen",
    header: "Origen",
    cell: ({ row }) => {
      const origen = row.getValue("idCuentaOrigen") as number | null
      return origen ? (
        <span className="font-mono text-sm">#{origen}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    },
  },
  {
    accessorKey: "idCuentaDestino",
    header: "Destino",
    cell: ({ row }) => {
      const destino = row.getValue("idCuentaDestino") as number | null
      return destino ? (
        <span className="font-mono text-sm">#{destino}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    },
  },
]

type Updater<T> = T | ((prev: T) => T)

interface TransaccionesDataTableProps {
  columns: ColumnDef<TransaccionType>[]
  data: TransaccionType[]
  pageCount: number
  pagination: PaginationState
  setPagination: (updater: Updater<PaginationState>) => void
  sorting: SortingState
  setSorting: (updater: Updater<SortingState>) => void
  globalFilter: string
  setGlobalFilter: (value: string) => void
  cuentaFilter: string
  setCuentaFilter: (value: string) => void
  fechaDesdeFilter: string
  setFechaDesdeFilter: (value: string) => void
  fechaHastaFilter: string
  setFechaHastaFilter: (value: string) => void
  loading?: boolean
}

export function TransaccionesDataTableFull({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  sorting,
  setSorting,
  globalFilter,
  setGlobalFilter,
  cuentaFilter,
  setCuentaFilter,
  fechaDesdeFilter,
  setFechaDesdeFilter,
  fechaHastaFilter,
  setFechaHastaFilter,
  loading,
}: TransaccionesDataTableProps) {
  const [searchTerm, setSearchTerm] = useState(globalFilter)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalFilter !== searchTerm) {
        setGlobalFilter(searchTerm)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm, globalFilter, setGlobalFilter])

  useEffect(() => {
    setSearchTerm(globalFilter)
  }, [globalFilter])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID o monto..."
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Input
            type="date"
            value={fechaDesdeFilter}
            onChange={(e) => {
              setFechaDesdeFilter(e.target.value)
              setPagination((p) => ({ ...p, pageIndex: 0 }))
            }}
            className="w-[150px]"
            placeholder="Desde"
          />
          <Input
            type="date"
            value={fechaHastaFilter}
            onChange={(e) => {
              setFechaHastaFilter(e.target.value)
              setPagination((p) => ({ ...p, pageIndex: 0 }))
            }}
            className="w-[150px]"
            placeholder="Hasta"
          />
          <Select value={cuentaFilter} onValueChange={(value) => {
            setCuentaFilter(value)
            setPagination((p) => ({ ...p, pageIndex: 0 }))
          }}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Cuenta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="origen">Origen</SelectItem>
              <SelectItem value="destino">Destino</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer font-semibold text-foreground"
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <span className="text-xs">↑</span>,
                        desc: <span className="text-xs">↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Cargando...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-border/50 transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  No se encontraron transacciones
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Página {pagination.pageIndex + 1} de {pageCount || 1}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border p-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border p-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}