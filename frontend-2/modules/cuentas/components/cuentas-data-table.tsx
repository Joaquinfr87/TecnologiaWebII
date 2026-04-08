"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
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
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit2, Loader2 } from "lucide-react"
import { useUpdateCuentaSaldoMutation } from "../hooks/use-cuentas"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

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

function EditSaldoCell({ row }: { row: Row<CuentaType> }) {
  const [isOpen, setIsOpen] = useState(false)
  const [saldo, setSaldo] = useState(row.original.saldo.toString())
  
  const { mutate: updateSaldo, isPending } = useUpdateCuentaSaldoMutation()

  const cuenta = row.original

  const handleSave = () => {
    updateSaldo(
      { id: cuenta.id, saldo: parseFloat(saldo) },
      {
        onSuccess: () => setIsOpen(false),
      }
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="h-8 w-8"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Saldo</SheetTitle>
            <SheetDescription>
              Actualiza el saldo de la cuenta #{cuenta.id}
            </SheetDescription>
          </SheetHeader>

          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">Nuevo Saldo</label>
            <Input
              type="number"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              placeholder="Ingrese el nuevo saldo"
            />
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
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
      const saldo = Number(row.getValue("saldo"))
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
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <EditSaldoCell row={row} />,
  },
]
