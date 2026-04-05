// app/dashboard/layout.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  const { isLoading, isError,error } = useQuery(sessionQueryOptions())

  useEffect(() => {
    if (isError){
      console.error(error)
    }
    // Si ya terminó de cargar y devolvió error (no autenticado), lo expulsamos
    if (!isLoading && isError) {
      // Usamos replace en vez de push para que el usuario no pueda 
      // usar el botón "Atrás" del navegador para volver al dashboard
      router.replace("/login")
    }
  }, [isLoading, isError, router, error])

  // 1. Mientras valida el token con Laravel, mostramos una pantalla de carga
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando sistema...</div>
  }

  // 2. Si dio error, retornamos null para que la pantalla quede en blanco 
  // la fracción de segundo que tarda el router.replace en actuar
  if (isError) {
    return null 
  }

  // 3. Si todo está bien, dibujamos tu Layout normal con su Sidebar, Header, etc.
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white p-4">Menú Lateral</aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
