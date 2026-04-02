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

type Updater<T> = T | ((prev: T) => T)

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  // 🔹 control externo
  pageCount: number

  pagination: PaginationState
  setPagination: (updater: Updater<PaginationState>) => void

  sorting: SortingState
  setSorting: (updater: Updater<SortingState>) => void

  globalFilter: string
  setGlobalFilter: (value: string) => void

  estadoFilter: string
  setEstadoFilter: (value: string) => void

  rolFilter: string
  setRolFilter: (value: string) => void

  loading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,

  pageCount,

  pagination,
  setPagination,

  sorting,
  setSorting,

  globalFilter,
  setGlobalFilter,

  estadoFilter,
  setEstadoFilter,

  rolFilter,
  setRolFilter,

  loading,
}: DataTableProps<TData, TValue>) {
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

      <div className="flex gap-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          className="border px-2 py-1 rounded w-64"
        />

        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos los Estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Suspendido">Suspendido</option>
        </select>

        <select
          value={rolFilter}
          onChange={(e) => setRolFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos los Roles</option>
          <option value="1">Administrador</option>
          <option value="2">Estudiante</option>
          <option value="3">Chofer</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                    {/* indicador simple */}
                    {{
                      asc: " ↑",
                      desc: " ↓",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  Cargando...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📄 paginación */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>

        <span>
          Página {pagination.pageIndex + 1} de {pageCount}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
