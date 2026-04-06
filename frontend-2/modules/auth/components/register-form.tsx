"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import { RegisterFormType, registerSchema } from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterMutation } from "../hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { rolesListQueryOptions } from "@/modules/roles/services/roles.query"
import Link from "next/link"
import { ArrowRight, Mail, User, IdCard, Calendar, Lock, Check } from "lucide-react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { data: roles, isLoading } = useQuery(rolesListQueryOptions())
  const {
    mutate: registerUser,
    isPending,
    isError,
    error,
  } = useRegisterMutation()
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      carnetIdentidad: "",
      fechaNacimiento: undefined,
      correoElectronico: "",
      rolId: undefined,
      contrasena: "",
      contrasena_confirmacion: "",
    },
  })
  async function onSubmit(data: RegisterFormType) {
    registerUser(data)
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("space-y-5", className)}
      {...props}
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Crear cuenta</h1>
        <p className="text-muted-foreground">
          Completa el formulario para registrarte
        </p>
      </div>
      
      {isError && (
        <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
          {error instanceof Error
            ? error.message
            : "Error al registrarte. Intenta de nuevo."}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Nombres */}
        <Field>
          <FieldLabel className="text-sm font-medium">Nombres</FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="nombres"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Tu nombre completo"
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Apellidos */}
        <Field>
          <FieldLabel className="text-sm font-medium">Apellidos</FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="apellidos"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Tus apellidos"
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Carnet Identidad */}
        <Field>
          <FieldLabel className="text-sm font-medium">Carnet de Identidad</FieldLabel>
          <div className="relative">
            <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="carnetIdentidad"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Número de CI"
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Fecha Nacimiento */}
        <Field>
          <FieldLabel className="text-sm font-medium">Fecha de Nacimiento</FieldLabel>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="fechaNacimiento"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="date"
                    id={field.name}
                    className="pl-10 h-11"
                    aria-invalid={fieldState.invalid}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value ? value : undefined)
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel className="text-sm font-medium">Email</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="correoElectronico"
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Rol */}
        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel className="text-sm font-medium">Rol</FieldLabel>
            <Controller
              name="rolId"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    name={field.name}
                    value={field.value?.toString() ?? ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {isLoading && (
                        <SelectItem value="loading" disabled>
                          Cargando...
                        </SelectItem>
                      )}

                      {roles?.data?.map((e) => (
                        <SelectItem key={e.id} value={e.id.toString()}>
                          {e.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </>
              )}
            />
          </FieldContent>
        </Field>

        {/* Contraseña */}
        <Field>
          <FieldLabel className="text-sm font-medium">Contraseña</FieldLabel>
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </>
              )}
            />
          </div>
        </Field>

        {/* Confirmar Contraseña */}
        <Field>
          <FieldLabel className="text-sm font-medium">Confirmar Contraseña</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Controller
              name="contrasena_confirmacion"
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
            Registrando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Crear Cuenta
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
        <Link href="/login" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </div>
    </form>
  )
}