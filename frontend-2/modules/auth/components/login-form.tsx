"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginForm as LoginFormType } from "../schemas/auth.schema"
import { useLoginMutation } from "../hooks/use-auth"
import Link from "next/link"
import { ArrowRight, Lock, Mail } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {mutate: loginUser, isPending, isError, error} = useLoginMutation()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      contrasena: "",
    }
  })
  async function onSubmit(data: LoginFormType) {
    loginUser(data);
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)} {...props}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h1>
        <p className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>
      
      {isError && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error instanceof Error ? error.message : "Error al iniciar sesión. Verifica tus credenciales."}
        </div>
      )}
      
      <div className="space-y-4">
        <Field>
          <FieldLabel className="text-sm font-medium">Email</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </>
              )}
            />
          </div>
        </Field>
        
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel className="text-sm font-medium">Contraseña</FieldLabel>
            <Link href="#" className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="contrasena"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </>
              )}
            />
          </div>
        </Field>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 text-base"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Iniciando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Iniciar Sesión
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿No tienes cuenta? </span>
        <Link href="/register" className="font-medium text-primary hover:underline">
          Regístrate aquí
        </Link>
      </div>
    </form>
  )
}