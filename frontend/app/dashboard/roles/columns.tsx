"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Rol } from "@/lib/types/Rol"
import { Button } from "@/components/ui/button"
import { SquarePen, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ColumnProps {
  setRol: (rol: Rol | undefined) => void;
  setOpen: (open: boolean) => void;
  router: ReturnType<typeof useRouter>
}
async function manejarEliminado(id: number,router:ReturnType<typeof useRouter>) {
  const confirmado = window.confirm("Estas seguro de eliminar el Rol")
  if (confirmado) {
    try {
      const res = await fetch("http://localhost:8000/api/roles/" + id,
        { method: "DELETE", })
      if (!res.ok) {
        const error = await res.json()
        console.error("Error al elimnar del backend", error)
        return
      }
      console.log("Eliminado exitosamente")
      router.refresh();
    } catch (err) {
      console.error("Error de red:", err)
    }
  }

}
export const columns = ({ setRol, setOpen ,router}: ColumnProps): ColumnDef<Rol>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const rol = row.original

      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
              setRol(rol)
              console.log(rol);
            }}
          >
            <SquarePen />
          </Button>
          <Button
            onClick={() => {
              manejarEliminado(rol.id,router)
            }
            }>
            <Trash2 />
          </Button>
        </div >
      )
    }
  },
]
