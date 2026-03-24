"use client"
import SheetRol from "@/components/roles/sheetRol"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Rol } from "@/lib/types/Rol"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RolesClient({data}:{data:Rol[]}) {
  const [rol, setRol] = useState<Rol|undefined>(undefined);
  const [open,setOpen]=useState(false);
  const router = useRouter();
  return (
    <div className="container mx-auto py-10">
      <SheetRol open={open} setOpen={setOpen} rol={rol} setRol={setRol}/>
      <DataTable columns={columns({setRol,setOpen,router})} data={data} />
    </div>
  )
}
