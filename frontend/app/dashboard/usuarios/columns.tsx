"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "@/lib/schemas/usuario.schema"

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nombres",
    header: "Nombres",
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "carnetIdentidad",
    header: "Carnet_Identidad",
  },
  {
    accessorKey:"fechaNacimiento",
    header:"Fecha Nacimiento"
  },
  {
    accessorKey:"estado",
    header:"Estado"
  }
]
