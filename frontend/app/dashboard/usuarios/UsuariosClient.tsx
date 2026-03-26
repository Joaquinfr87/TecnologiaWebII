"use client"
import SheetUsario from "@/components/usuarios/sheetUsario"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Usuario } from "@/lib/types/Usuario"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Rol } from "@/lib/types/Rol"

export default function UsuariosClient({ data }: { data: Usuario[] }) {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [roles, setRoles] = useState<Rol[]>([])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/roles")
        const data = await res.json()
        setRoles(data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchRoles()
  })

  const rolesMap = useMemo(()=>{
    return Object.fromEntries(
      roles.map(r=>[r.id,r.nombre])
    )
  }, [roles])

  return (
    <div className="container mx-auto py-10">
      <SheetUsario
        open={open}
        setOpen={setOpen}
        usuario={usuario}
        setUsuario={setUsuario}
      />
      <DataTable
        columns={columns({ setUsuario, setOpen, router,rolesMap })}
        data={data}
      />
    </div>
  )
}
