import SheetUsario from "@/components/usuarios/sheetUsario"
import { columns } from "./columns"
import { Usuario } from "@/lib/schemas/usuario.schema"
import { DataTable } from "./data-table"

async function getData(): Promise<Usuario[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <SheetUsario/>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
