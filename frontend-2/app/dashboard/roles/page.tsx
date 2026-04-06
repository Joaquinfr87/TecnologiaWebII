// app/dashboard/roles/page.tsx
"use client"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname } from "next/navigation"
import { columns } from "@/modules/roles/components/roles-columns"
import { DataTable } from "@/modules/roles/components/roles-data-table"
import SheetRol from "@/modules/roles/components/roles-sheet"
import { rolesListQueryOptions } from "@/modules/roles/services/roles.query"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  
  const { data, isLoading } = useQuery(rolesListQueryOptions())
  const rows = data?.data ?? [] 

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10">
            <Shield className="h-6 w-6 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Roles y Tarifas</h1>
            <p className="text-sm text-muted-foreground">Gestión de roles del sistema</p>
          </div>
        </div>
        <Button onClick={() => router.replace(`${pathname}?rolId=new`)}>
          Crear Nuevo Rol
        </Button>
      </div>
      
      <div className="w-full">
        <DataTable columns={columns} data={rows} loading={isLoading} />
      </div>

      <SheetRol />
    </div>
  )
}