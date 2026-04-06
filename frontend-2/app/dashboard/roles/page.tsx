// app/dashboard/roles/page.tsx
"use client"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname } from "next/navigation"
import { columns } from "@/modules/roles/components/roles-columns"
import { DataTable } from "@/modules/roles/components/roles-data-table"
import SheetRol from "@/modules/roles/components/roles-sheet"
import { rolesListQueryOptions } from "@/modules/roles/services/roles.query"
import { Button } from "@/components/ui/button"

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  
  const { data, isLoading } = useQuery(rolesListQueryOptions())
  const rows = data?.data ?? [] 

  if (isLoading) return <div className="p-10 text-center">Cargando tabla de roles...</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Roles</h1>
        <Button onClick={() => router.replace(`${pathname}?rolId=new`)}>
          Crear Nuevo Rol
        </Button>
      </div>
      
      <DataTable columns={columns} data={rows} />

      <SheetRol />
    </div>
  )
}
