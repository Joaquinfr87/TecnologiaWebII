import SheetUsario from "@/components/usuarios/sheetUsario"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Usuario } from "@/lib/types/Usuario"

export default function UsuariosClient({data}:{data:Usuario[]}) {
  return (
    <div className="container mx-auto py-10">
      <SheetUsario />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
