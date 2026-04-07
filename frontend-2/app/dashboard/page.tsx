"use client"

import { useQuery } from "@tanstack/react-query"
import { useSessionUser } from "./lib/use-session-user"
import { isAdmin, isChofer, isEstudiante } from "./lib/roles"
import { User, Wallet, Bus, GraduationCap, Clock, AlertCircle, Smartphone, ArrowDownLeft, Activity, CreditCard } from "lucide-react"
import { fetchCuentas } from "@/modules/cuentas/services/cuentas.api"
import { fetchTransacciones } from "@/modules/transacciones/services/transacciones.api"
import { fetchDispositivos } from "@/modules/dispositivos/services/dispositivos.api"
import { TransaccionesDataTable, transaccionesColumns } from "@/modules/transacciones/components/transacciones-data-table"
import { CuentasDataTable, cuentasColumns } from "@/modules/cuentas/components/cuentas-data-table"
import { DispositivosDataTable, dispositivosColumns } from "@/modules/dispositivos/components/dispositivos-data-table"

export default function DashboardPage() {
  const { data: user, isLoading } = useSessionUser()
  const rol = user?.role

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    )
  }

  if (isAdmin(rol)) {
    return <DashboardAdmin />
  }

  if (isChofer(rol)) {
    return <DashboardChofer />
  }

  if (isEstudiante(rol)) {
    return <DashboardEstudiante />
  }

  return (
    <div className="p-6 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold">Rol no reconocido</h2>
        <p className="text-muted-foreground">Contacte al administrador</p>
      </div>
    </div>
  )
}

function DashboardAdmin() {
  const { data: cuentasData, isLoading: loadingCuentas } = useQuery({
    queryKey: ["cuentas"],
    queryFn: () => fetchCuentas(),
  })

  const { data: transaccionesData, isLoading: loadingTransacciones } = useQuery({
    queryKey: ["transacciones"],
    queryFn: () => fetchTransacciones({ perPage: 100 }),
  })

  const { data: dispositivos, isLoading: loadingDispositivos } = useQuery({
    queryKey: ["dispositivos"],
    queryFn: fetchDispositivos,
  })

  const cuentas = cuentasData ?? []
  const transacciones = transaccionesData?.data ?? []
  
  const totalCuentas = cuentas.length
  const saldoTotal = cuentas.reduce((acc, c) => acc + c.saldo, 0)
  const dispositivosActivos = dispositivos?.filter(d => d.estado === "Activo").length ?? 0
  const totalTransacciones = transacciones.length

  const ultimasTransacciones = transacciones.slice(0, 5)

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Administrador</h1>
          <p className="text-sm text-muted-foreground">Resumen general del sistema</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group relative overflow-hidden rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cuentas</p>
              <p className="text-2xl font-bold">{totalCuentas}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <CreditCard className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Saldo Total</p>
              <p className="text-2xl font-bold text-emerald-600">Bs. {saldoTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
              <ArrowDownLeft className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transacciones</p>
              <p className="text-2xl font-bold">{totalTransacciones}</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-300">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
              <Smartphone className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dispositivos</p>
              <p className="text-2xl font-bold">{dispositivosActivos} <span className="text-sm font-normal text-muted-foreground">/ {dispositivos?.length ?? 0}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ArrowDownLeft className="h-5 w-5 text-violet-500" />
              Últimas Transacciones
            </h2>
          </div>
          <TransaccionesDataTable
            columns={transaccionesColumns}
            data={ultimasTransacciones}
            loading={loadingTransacciones}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              Cuentas Recientes
            </h2>
          </div>
          <CuentasDataTable
            columns={cuentasColumns}
            data={cuentas?.slice(0, 5) ?? []}
            loading={loadingCuentas}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-orange-500" />
            Dispositivos Registrados
          </h2>
        </div>
        <DispositivosDataTable
          columns={dispositivosColumns}
          data={dispositivos?.slice(0, 5) ?? []}
          loading={loadingDispositivos}
        />
      </div>
    </div>
  )
}

function DashboardChofer() {
  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-500/10">
          <Bus className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Chofer</h1>
          <p className="text-sm text-muted-foreground">Panel de control de choferes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Bus className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium">Viajes Realizados Hoy</span>
          </div>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Recaudación Hoy</span>
          </div>
          <p className="text-3xl font-bold text-green-600">Bs. 340</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Funciones de Chofer</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>✓ Registrar NFC de pasajeros</li>
          <li>✓ Ver historial de viajes</li>
          <li>✓ Consultar saldo de cuenta</li>
          <li>✓ Registrar dispositivo móvil</li>
        </ul>
      </div>
    </div>
  )
}

function DashboardEstudiante() {
  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-green-500/10">
          <GraduationCap className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Estudiante</h1>
          <p className="text-sm text-muted-foreground">Panel de estudiante</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Saldo Actual</span>
          </div>
          <p className="text-3xl font-bold text-green-600">Bs. 150.00</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Viajes Este Mes</span>
          </div>
          <p className="text-3xl font-bold">24</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Funciones de Estudiante</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>✓ Ver saldo y recargar cuenta</li>
          <li>✓ Historial de transacciones</li>
          <li>✓ Gestionar tarjetas NFC</li>
          <li>✓ Ver datos personales</li>
        </ul>
      </div>
    </div>
  )
}
