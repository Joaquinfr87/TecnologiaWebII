"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CuentaType } from "../schemas/cuentas.schema"

interface DataTableProps {
  columns: ColumnDef<CuentaType>[]
  data: CuentaType[]
  loading?: boolean
}

export function CuentasDataTable({ columns, data, loading }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-semibold text-foreground">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                className="hover:bg-muted/50 transition-colors border-b border-border/50"
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
                No hay datos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export const cuentasColumns: ColumnDef<CuentaType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-sm">#{row.getValue("id")}</span>,
  },
  {
    accessorKey: "saldo",
    header: "Saldo",
    cell: ({ row }) => {
      const saldo = row.getValue("saldo") as number
      return <span className="font-semibold text-emerald-600">Bs. {saldo.toFixed(2)}</span>
    },
  },
  {
    accessorKey: "usuarioId",
    header: "Usuario",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-xs">
        {String(row.getValue("usuarioId")).slice(0, 8)}...
      </span>
    ),
  },
]