"use client"
import SheetUsario from "@/components/usuarios/sheetUsario"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Usuario } from "@/lib/types/Usuario"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UsuariosClient({data}:{data:Usuario[]}) {
  const [usuario, setUsuario] = useState<Usuario|undefined>(undefined);
  const [open,setOpen]=useState(false);
  const router = useRouter();
  return (
    <div className="container mx-auto py-10">
      <SheetUsario open={open} setOpen={setOpen} usuario={usuario} setUsuario={setUsuario}/>
      <DataTable columns={columns({setUsuario,setOpen,router})} data={data} />
    </div>
  )
}
