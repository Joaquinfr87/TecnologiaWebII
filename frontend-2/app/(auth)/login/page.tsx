"use client"
import { LoginForm } from "@/modules/auth/components/login-form"
import { useQuery } from "@tanstack/react-query"
import { Bus } from "lucide-react"
import { useRouter } from "next/navigation"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { useEffect } from "react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const { isLoading, isSuccess, data } = useQuery(sessionQueryOptions())

  useEffect(() => {
    if (isSuccess && data) {
      router.replace("/dashboard")
    }
  }, [isSuccess, data, router])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Verificando...</span>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return null
  }
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
            <Bus className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">TransporteUPDS</span>
        </Link>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          © 2026 Sistema de Transporte UPDS
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-10 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/80">Sistema de Pago Digital</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Viaja sin efectivo,<br/>
              <span className="text-primary">sin complicaciones</span>
            </h2>
            
            <p className="text-white/60 max-w-md mx-auto">
              Accede a tu cuenta y gestiona tu saldo de forma segura y conveniente.
            </p>
          </div>

          {/* Card Mockup */}
          <div className="relative mt-8">
            <div className="w-72 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 shadow-2xl border border-white/10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-xs text-white/50 mb-1">Saldo disponible</div>
                  <div className="text-2xl font-bold text-white">Bs. 125.50</div>
                </div>
                <div className="h-8 w-12 rounded-lg bg-gradient-to-r from-primary to-blue-500 opacity-80" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-12 rounded-lg bg-white/10" />
                  <span className="text-sm text-white/60">**** 4289</span>
                </div>
                <span className="text-xs text-white/40">NFC</span>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -left-16 top-8 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-xs text-white/60">Pago exitoso</div>
              <div className="text-sm font-medium text-white">Bs. 2.00</div>
            </div>
            
            <div className="absolute -right-12 bottom-8 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-xs text-white/60">Dispositivo</div>
              <div className="text-sm font-medium text-white">Conectado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}