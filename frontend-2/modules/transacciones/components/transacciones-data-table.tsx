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
import { TransaccionType } from "../schemas/transacciones.schema"
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign } from "lucide-react"

interface DataTableProps {
  columns: ColumnDef<TransaccionType>[]
  data: TransaccionType[]
  loading?: boolean
}

export function TransaccionesDataTable({ columns, data, loading }: DataTableProps) {
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
                No hay transacciones registradas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export const transaccionesColumns: ColumnDef<TransaccionType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm text-muted-foreground">#{row.getValue("id")}</span>
      </div>
    ),
  },
  {
    accessorKey: "monto",
    header: "Monto",
    cell: ({ row }) => {
      const monto = row.getValue("monto") as number
      return (
        <div className="flex items-center gap-2">
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          <span className="font-bold text-emerald-600">Bs. {monto.toFixed(2)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "fecha",
    header: "Fecha y Hora",
    cell: ({ row }) => {
      const fecha = row.getValue("fecha") as string
      const date = new Date(fecha)
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{date.toLocaleDateString("es-BO")}</span>
          <span className="text-xs text-muted-foreground">{date.toLocaleTimeString("es-BO", { hour: '2-digit', minute: '2-digit' })}</span>
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
        <div className="flex items-center gap-1">
          <ArrowDownLeft className="h-3 w-3 text-amber-500" />
          <span className="font-mono text-sm">#{origen}</span>
        </div>
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
        <div className="flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3 text-blue-500" />
          <span className="font-mono text-sm">#{destino}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    },
  },
]