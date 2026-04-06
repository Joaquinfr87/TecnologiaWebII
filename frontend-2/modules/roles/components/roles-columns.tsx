// modules/roles/components/roles-columns.tsx
"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useDeleteRolMutation } from "@/modules/roles/hooks/use-roles"
import { RolType } from "../schemas/roles.schema"

const AccionesCell = ({ rol }: {rol:RolType}) => { 
  const router = useRouter()
  const pathname = usePathname()
  const { mutate: deleteRol, isPending: isDeleting } = useDeleteRolMutation()

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => router.replace(`${pathname}?rolId=${rol.id}`)}
      >
        Editar
      </Button>
      <Button 
        variant="destructive" 
        size="sm"
        disabled={isDeleting}
        onClick={() => {
          if (confirm("¿Estás seguro de eliminar este rol?")) {
            deleteRol(rol.id)
          }
        }}
      >
        Eliminar
      </Button>
    </div>
  )
}

export const columns: ColumnDef<RolType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey:"nombre",
    header:"Nombre"
  },
  {
    accessorKey: "tarifa.monto",
    header:"Monto",
  },
  {
    accessorKey:"tarifa.estado",
    header:"Estado"
  },
  {
    id: "acciones",
    cell: ({ row }) => <AccionesCell rol={row.original} />
  }
]

