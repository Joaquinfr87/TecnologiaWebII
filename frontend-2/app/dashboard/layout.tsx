// app/dashboard/layout.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Menu } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const { isLoading, isError, error } = useQuery(sessionQueryOptions())

  useEffect(() => {
    if (isError) {
      console.error(error)
    }
    if (!isLoading && isError) {
      router.replace("/login")
    }
  }, [isLoading, isError, router, error])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando sistema...</div>
  }

  if (isError) {
    return null
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <header className="flex h-14 items-center gap-2 border-b px-4 lg:px-6">
              <SidebarTrigger className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            </header>
            <main className="flex flex-1 flex-col">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}