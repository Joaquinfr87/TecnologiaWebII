"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "@/modules/usuario/schemas/usuario.schema"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"


export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nombres",
    header: "Nombre",
  },
  {
    accessorKey: "apellidos",
    header: "Apellido",
  },
  {
    accessorKey: "carnetIdentidad",
    header: "Carnet Identidad",
  },
  {
    accessorKey:"fechaNacimiento",
    header: "Fecha de Nacimiento",
    cell: ({row})=> new Date(row.original.fechaNacimiento).toLocaleDateString()
  },
  {
    accessorKey:"correoElectronico",
    header:"Email"
  },
  {
    accessorKey:"rol.nombre",
    id:"rol",
    header:"Rol"
  },
  {
    accessorKey:"estado",
    header:"Estado"
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            router.push(`?usuarioId=${row.original.id}`)
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )
    },
  },
]
