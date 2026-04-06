"use client"

import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import {
  Users,
  Wallet,
  CreditCard,
  Smartphone,
  ArrowLeftRight,
  Bus,
  FlaskConical,
  SquareTerminal,
  Ticket,UserCog,Activity
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
const data = {
  teams: [
    {
      name: "Sistema Transporte",
      logo: Bus,
      plan: "Producción",
    },
    {
      name: "Entorno Pruebas",
      logo: FlaskConical,
      plan: "Testing",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Resumen",
          url: "/dashboard",
        },
        {
          title: "Actividad",
          url: "/dashboard/activity",
        },
      ],
    },

    {
      title: "Usuarios",
      url: "/dashboard/usuario",
      icon: Users,
      items: [
        {
          title: "Lista",
          url: "/dashboard/usuario",
        },
        {
          title: "Roles y Tarifas",
          url: "/dashboard/roles",
        },
      ],
    },

    {
      title: "Cuentas",
      url: "/dashboard/cuentas",
      icon: Wallet,
      items: [
        {
          title: "Cuentas",
          url: "/dashboard/cuentas",
        },
        {
          title: "Saldo",
          url: "/dashboard/cuentas/saldo",
        },
      ],
    },

    {
      title: "Tarjetas NFC",
      url: "/dashboard/tarjetas",
      icon: CreditCard,
      items: [
        {
          title: "Listado",
          url: "/dashboard/tarjetas",
        },
        {
          title: "Asignaciones",
          url: "/dashboard/tarjetas/asignaciones",
        },
      ],
    },

    {
      title: "Dispositivos",
      url: "/dashboard/dispositivos",
      icon: Smartphone,
      items: [
        {
          title: "Registrados",
          url: "/dashboard/dispositivos",
        },
      ],
    },

    {
      title: "Transacciones",
      url: "/dashboard/transacciones",
      icon: ArrowLeftRight,
      items: [
        {
          title: "Historial",
          url: "/dashboard/transacciones",
        },
        {
          title: "Cobros",
          url: "/dashboard/transacciones/cobros",
        },
        {
          title: "Recargas",
          url: "/dashboard/transacciones/recargas",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Control de Pasajes",
      url: "/dashboard/transacciones",
      icon: Ticket,
    },
    {
      name: "Gestión de Usuarios",
      url: "/dashboard/usuario",
      icon: UserCog,
    },
    {
      name: "Monitoreo",
      url: "/dashboard",
      icon: Activity,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data:user } = useQuery(sessionQueryOptions())
  const userProp = {
    name:user?.name as string,
    email:user?.email as string,
    avatar:""
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userProp} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
