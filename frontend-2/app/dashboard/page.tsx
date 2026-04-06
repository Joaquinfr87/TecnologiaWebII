"use client"

import { useQuery } from "@tanstack/react-query"
import { Wallet, CreditCard, ArrowDownLeft, Smartphone, Activity } from "lucide-react"
import { fetchCuentas } from "@/modules/cuentas/services/cuentas.api"
import { fetchTransacciones } from "@/modules/transacciones/services/transacciones.api"
import { fetchDispositivos } from "@/modules/dispositivos/services/dispositivos.api"
import { TransaccionesDataTable, transaccionesColumns } from "@/modules/transacciones/components/transacciones-data-table"
import { CuentasDataTable, cuentasColumns } from "@/modules/cuentas/components/cuentas-data-table"
import { DispositivosDataTable, dispositivosColumns } from "@/modules/dispositivos/components/dispositivos-data-table"

export default function DashboardPage() {
  const { data: cuentas, isLoading: loadingCuentas } = useQuery({
    queryKey: ["cuentas"],
    queryFn: fetchCuentas,
  })

  const { data: transacciones, isLoading: loadingTransacciones } = useQuery({
    queryKey: ["transacciones"],
    queryFn: fetchTransacciones,
  })

  const { data: dispositivos, isLoading: loadingDispositivos } = useQuery({
    queryKey: ["dispositivos"],
    queryFn: fetchDispositivos,
  })

  const totalCuentas = cuentas?.length ?? 0
  const saldoTotal = cuentas?.reduce((acc, c) => acc + c.saldo, 0) ?? 0
  const dispositivosActivos = dispositivos?.filter(d => d.estado === "Activo").length ?? 0
  const totalTransacciones = transacciones?.length ?? 0

  const ultimasTransacciones = transacciones?.slice(0, 5) ?? []

  return (
    <div className="p-4 md:p-6 space-y-6 bg-background min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Resumen general del sistema</p>
        </div>
      </div>

      {/* KPIs */}
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

      {/* Tablas resumen */}
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

      {/* Dispositivos */}
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