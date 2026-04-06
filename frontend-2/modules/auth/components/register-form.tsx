"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldError,
  FieldLabel,
  FieldContent,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import { RegisterFormType, registerSchema } from "../schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterMutation } from "../hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { rolesListQueryOptions } from "@/modules/roles/services/roles.query"

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
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Rellena el formulario para crear tu cuenta
          </p>
        </div>
        {isError && (
          <div className="rounded-md border border-red-300 bg-red-100 p-3 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Error al iniciar sesión. Verifica tus credenciales."}
          </div>
        )}
        <Controller
          name="nombres"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nombres</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="apellidos"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Apellidos</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="carnetIdentidad"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Carnet Identidad</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="fechaNacimiento"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Fecha Nacimiento</FieldLabel>
              <Input
                {...field}
                type="date"
                id={field.name}
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
            </Field>
          )}
        />
        <Controller
          name="correoElectronico"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="rolId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="form-rhf-select-estado">Rol</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value?.toString() ?? ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  id="form-rhf-select-estado"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px]"
                >
                  <SelectValue placeholder="Selecciona" />
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
            </Field>
          )}
        />
        <Controller
          name="contrasena"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Contrasena</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="*************"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="contrasena_confirmacion"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirma contrasena</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="*************"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Registra</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
