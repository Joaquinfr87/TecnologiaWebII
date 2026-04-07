// app/dashboard/layout.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { SessionUser } from "@/modules/auth/schemas/auth.schema"
import { useRouter } from "next/navigation"
import { useEffect, createContext, useContext } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Menu } from "lucide-react"
import { isAdmin, isChofer, isEstudiante } from "./lib/roles"

const SessionContext = createContext<SessionUser | null>(null)
export const useSession = () => useContext(SessionContext)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const { data: user, isLoading, isError, error } = useQuery(sessionQueryOptions())

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
        <SessionContext.Provider value={user ?? null}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <header className="flex h-14 items-center gap-2 border-b px-4 lg:px-6">
                <SidebarTrigger className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                {user && (
                  <span className="ml-auto text-sm text-muted-foreground">
                    {user.name} (Rol: {user.role})
                  </span>
                )}
              </header>
              <main className="flex flex-1 flex-col">
                {children}
              </main>
            </div>
          </div>
        </SessionContext.Provider>
      </SidebarProvider>
    </TooltipProvider>
  )
}