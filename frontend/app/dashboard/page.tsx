"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/app/actions/auth.actions"
export default function page() {
  const router = useRouter()
  async function handleLogout() {
    await logoutAction();
    // Redirigimos al usuario de vuelta a tu formulario de login
    router.push('/login');
  }
  return (
    <div>
      <Button onClick={handleLogout} variant="destructive">
        Cerrar Sesión
      </Button>
      <Button>
        <a href="/dashboard/usuarios">Usuario</a>
      </Button>
      <Button >
        <a href="/dashboard/roles">Roles</a>
      </Button>
    </div>
  )
}
