"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "@/modules/usuario/schemas/usuario.schema"


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
    header: "Fecha de Nacimiento"
  },
  {
    accessorKey:"correoElectronico",
    header:"Email"
  },
  {
    accessorKey:"rolId",
    header:"Rol"
  },
  {
    accessorKey:"estado",
    header:"Estado"
  }
]
