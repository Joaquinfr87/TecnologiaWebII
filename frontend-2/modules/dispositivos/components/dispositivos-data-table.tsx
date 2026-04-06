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
import { DispositivoType } from "../schemas/dispositivos.schema"
import { Smartphone, MapPin, Calendar } from "lucide-react"

interface DataTableProps {
  columns: ColumnDef<DispositivoType>[]
  data: DispositivoType[]
  loading?: boolean
}

export function DispositivosDataTable({ columns, data, loading }: DataTableProps) {
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
                No hay dispositivos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const estadoStyles: Record<string, { bg: string; text: string; icon: string }> = {
  Activo: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "●" },
  Inactivo: { bg: "bg-slate-100", text: "text-slate-700", icon: "○" },
  Bloqueado: { bg: "bg-red-100", text: "text-red-700", icon: "⨁" },
}

export const dispositivosColumns: ColumnDef<DispositivoType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Smartphone className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm text-muted-foreground">#{row.getValue("id")}</span>
      </div>
    ),
  },
  {
    accessorKey: "marcaModelo",
    header: "Dispositivo",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("marcaModelo")}</span>
        <span className="text-xs text-muted-foreground">{row.original.modeloApp}</span>
      </div>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string
      const style = estadoStyles[estado] || estadoStyles.Inactivo
      return (
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
            <span className="text-[10px]">{style.icon}</span>
            {estado}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "fechaRegistro",
    header: "Registrado",
    cell: ({ row }) => {
      const fecha = row.getValue("fechaRegistro") as string
      const date = new Date(fecha)
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{date.toLocaleDateString("es-BO")}</span>
        </div>
      )
    },
  },
]