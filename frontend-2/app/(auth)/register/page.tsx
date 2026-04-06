import { RegisterForm } from "@/modules/auth/components/register-form"
import { Bus } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-slate-900" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
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
              <span className="text-sm text-white/80">Únete al futuro del transporte</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Crea tu cuenta<br/>
              <span className="text-white/80">y comienza a viajar</span>
            </h2>
            
            <p className="text-white/60 max-w-md mx-auto">
              Regístrate en segundos y accede a todos los beneficios del sistema de pago digital.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-4 mt-8 max-w-sm">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-left">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <div>
                <div className="font-medium text-white">Sin efectivo</div>
                <div className="text-xs text-white/60">Paga con un toque</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-left">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white">📱</span>
              </div>
              <div>
                <div className="font-medium text-white">App móvil</div>
                <div className="text-xs text-white/60">Controla tu saldo</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-left">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white">🔒</span>
              </div>
              <div>
                <div className="font-medium text-white">100% Seguro</div>
                <div className="text-xs text-white/60">Tus datos protegidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-14 overflow-y-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
            <Bus className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">TransporteUPDS</span>
        </Link>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          © 2026 Sistema de Transporte UPDS
        </div>
      </div>
    </div>
  )
}