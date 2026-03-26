"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Usuario } from "@/lib/types/Usuario"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SquarePen, Trash2 } from "lucide-react"
import { Rol } from "@/lib/types/Rol"

interface ColumnProps {
  setUsuario: (usuario: Usuario | undefined) => void
  setOpen: (open: boolean) => void
  router: ReturnType<typeof useRouter>
  rolesMap: Record<number,string>
}
async function manejarEliminado(id: number, router: ReturnType<typeof useRouter>) {
  const confirmado = window.confirm("Estas seguro de eliminar el Usuario")
  if (confirmado) {
    try {
      const res = await fetch("http://localhost:8000/api/users/" + id,
        { method: "DELETE", })
      if (!res.ok) {
        const errorText = await res.text()
        try {
          const errorJson = JSON.parse(errorText)
          console.error("Error al eliminar del backend", errorJson);
        } catch (parseError) {
          console.error("Error del servidor (no es Json):", errorText)
        }
        return
      }
      console.log("Eliminado exitosamente")
      router.refresh();
    } catch (err) {
      console.error("Error de red:", err)
    }
  }
}
export const columns = ({ setUsuario, setOpen, router,rolesMap }: ColumnProps): ColumnDef<Usuario>[] => [
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
    accessorKey: "fechaNacimiento",
    header: "Fecha Nacimiento"
  },
  {
    accessorKey: "rolId",
    header: "Rol",
    cell:({getValue})=>{
      const rolId = getValue<number>();//=> es lo mismo que row.original["rolId"]
      return rolesMap[rolId]??"Desconocido"
    } 
  },
  {
    accessorKey: "estado",
    header: "Estado"
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const usuario = row.original

      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
              setUsuario(usuario)
              console.log(usuario);
            }}
          >
            <SquarePen />
          </Button>
          <Button
            onClick={() => {
              manejarEliminado(usuario.id, router)
            }
            }>
            <Trash2 />
          </Button>
        </div >
      )
    }
  },
]
