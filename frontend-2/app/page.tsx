"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { Button } from "@/components/ui/button"
import { Bus, Wallet, Smartphone, CreditCard, ArrowRight, CheckCircle2, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const router = useRouter()
  const { isLoading, isSuccess, data } = useQuery(sessionQueryOptions())

  useEffect(() => {
    if (isSuccess && data) {
      router.replace("/dashboard")
    }
  }, [isSuccess, data, router])

  if (isLoading || isSuccess) {
    return null
  }

  const features = [
    {
      icon: Wallet,
      title: "Billetera Digital",
      description: "Gestiona tu saldo de forma segura y realiza recargas instantáneas desde la app."
    },
    {
      icon: CreditCard,
      title: "Pago con NFC",
      description: "Usa tu tarjeta o teléfono para pagar pasaje con un simple toque."
    },
    {
      icon: Smartphone,
      title: "App Móvil",
      description: "Controla tus transacciones, saldo y dispositivos desde cualquier lugar."
    },
    {
      icon: Shield,
      title: "Seguro y Confiable",
      description: "Tu información protegida con los más altos estándares de seguridad."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bus className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">TransporteUPDS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Sistema de Pago de Transporte
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Viaja sin efectivo,
                <span className="text-primary"> sin complicaciones</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                El sistema de pago digital para el transporte público de la UPDS. 
                Rápido, seguro y conveniente para estudiantes y personal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Comenzar Ahora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Ya tengo cuenta
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Sin efectivo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Pago NFC</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>100% Seguro</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                {/* Card Mockup */}
                <div className="relative rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl">
                  <div className="absolute top-4 right-4">
                    <div className="h-8 w-12 rounded bg-primary/20" />
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="text-sm text-slate-400">Saldo Disponible</div>
                    <div className="text-3xl font-bold text-white">Bs. 125.50</div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-12 rounded bg-gradient-to-r from-primary to-blue-500" />
                        <span className="text-sm text-slate-300">**** 4289</span>
                      </div>
                      <div className="text-xs text-slate-500">NFC</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-8 top-1/4 rounded-xl border bg-background p-4 shadow-lg animate-float">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Pago exitoso</div>
                      <div className="text-xs text-muted-foreground">Bs. 2.00</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/4 rounded-xl border bg-background p-4 shadow-lg animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Dispositivo</div>
                      <div className="text-xs text-muted-foreground">Conectado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué usar nuestro sistema?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Una solución moderna diseñada para hacer tu experiencia de transporte más conveniente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative rounded-xl border bg-background p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Usuarios registrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50000+</div>
              <div className="text-muted-foreground">Transacciones realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Tiempo de disponibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Únete al sistema de transporte digital de la UPDS y olvídate del efectivo
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Crear mi cuenta
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Bus className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium">TransporteUPDS</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 Sistema de Transporte UPDS. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}