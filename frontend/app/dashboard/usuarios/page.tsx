import SheetUsario from "@/components/usuarios/sheetUsario"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export type Usuario = {
  nombres:string,
  apellidos:string,
  carnetIdentidad:string,
  fechaNacimiento:Date,
  estado: "Activo"|"Inactivo"|"Suspendido",
}
async function getData(): Promise<Usuario[]> {
 try {
    const res = await fetch("http://localhost:8000/api/users");
    
    if (!res.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const json = await res.json();
    const data = json.data ?? json;
    
    return data;

  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function Page() {
  const data = await getData()


  return (
    <div className="container mx-auto py-10">
      <SheetUsario/>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
