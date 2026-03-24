"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "@/lib/schemas/usuario.schema"

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "Nombres",
    header: "Nombres",
  },
  {
    accessorKey: "Apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "Carnet_Identidad",
    header: "Carnet_Identidad",
  },
  {
    accessorKey:"Fecha_Nacimiento",
    header:"Fecha Nacimiento"
  },
  {
    accessorKey:"Estado",
    header:"Estado"
  }
]
