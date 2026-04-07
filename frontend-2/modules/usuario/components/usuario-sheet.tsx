"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Field, FieldError, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { usuarioQueryOptions } from "../services/usuario.queries"
import { useCreateUsuarioMutation, useUpdateUsuarioMutation } from "../hooks/use-usuarios"
import { formularioUsuarioSchema, FormularioUsuario } from "../schemas/usuario.schema"

export default function SheetUsuario() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const usuarioIdParam = searchParams.get("usuarioId")
  const isOpen = !!usuarioIdParam
  const isEditing = isOpen && usuarioIdParam !== "new"
  const stringId = isEditing ? String(usuarioIdParam) : ""

  const { mutate: createUsuario, isPending: isCreating } = useCreateUsuarioMutation()
  const { mutate: updateUsuario, isPending: isUpdating } = useUpdateUsuarioMutation()
  const isPending = isCreating || isUpdating

  const { data: usuarioData, isLoading: isLoadingQuery } = useQuery({
    ...usuarioQueryOptions(stringId),
    enabled: isEditing && stringId !== "",
  })

  const form = useForm<FormularioUsuario>({
    resolver: zodResolver(formularioUsuarioSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      carnetIdentidad: "",
      fechaNacimiento: "",
      correoElectronico: "",
      rolId: 0,
      estado: "Activo",
    },
  })

  useEffect(() => {
    if (usuarioIdParam === "new") {
      form.reset({
        nombres: "",
        apellidos: "",
        carnetIdentidad: "",
        fechaNacimiento: "",
        correoElectronico: "",
        rolId: 0,
        estado: "Activo",
      })
    } else if (usuarioData) {
      form.reset({
        nombres: usuarioData.nombres,
        apellidos: usuarioData.apellidos,
        carnetIdentidad: usuarioData.carnetIdentidad,
        fechaNacimiento: usuarioData.fechaNacimiento,
        correoElectronico: usuarioData.correoElectronico,
        rolId: usuarioData.rol.id,
        estado: usuarioData.estado,
      })
    }
  }, [usuarioIdParam, usuarioData, form])

  function closeSheet() {
    router.replace(pathname)
  }

  function onSubmit(data: FormularioUsuario) {
    if (isEditing) {
      updateUsuario({ id: stringId, data }, { onSuccess: closeSheet })
    } else {
      createUsuario(data, { onSuccess: closeSheet })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="flex flex-col w-[400px] sm:max-w-[420px]">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            {isEditing ? "Editar usuario" : "Nuevo usuario"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground mt-1">
            {isEditing 
              ? `Actualiza la información de ${usuarioData?.nombres || ''} ${usuarioData?.apellidos || ''}`
              : "Registra un nuevo usuario en el sistema"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoadingQuery ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Cargando información...
            </div>
          ) : (
            <form id="form-usuario" className="space-y-5">
              <div className="space-y-4">
                <Controller
                  name="nombres"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Nombres
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        disabled={isPending}
                        placeholder="Ingresa los nombres"
                        className="mt-1.5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="apellidos"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Apellidos
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        disabled={isPending}
                        placeholder="Ingresa los apellidos"
                        className="mt-1.5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="carnetIdentidad"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Carnet de identidad
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        disabled={isPending}
                        placeholder="Número de carnet"
                        className="mt-1.5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="fechaNacimiento"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Fecha de nacimiento
                      </FieldLabel>
                      <Input
                        type="date"
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        disabled={isPending}
                        className="mt-1.5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="correoElectronico"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Correo electrónico
                      </FieldLabel>
                      <Input
                        type="email"
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        disabled={isPending}
                        placeholder="correo@ejemplo.com"
                        className="mt-1.5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-medium text-foreground/80">Configuración</h3>
                
                <Controller
                  name="rolId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor="select-rol" className="text-sm font-medium">
                          Rol
                        </FieldLabel>
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.value?.toString() ?? ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger
                          id="select-rol"
                          aria-invalid={fieldState.invalid}
                          className="w-[160px]"
                        >
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="1">Administrador</SelectItem>
                          <SelectItem value="2">Usuario</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                {isEditing && (
                  <Controller
                    name="estado"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel htmlFor="select-estado" className="text-sm font-medium">
                            Estado
                          </FieldLabel>
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="select-estado"
                            aria-invalid={fieldState.invalid}
                            className="w-[160px]"
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value="Activo">Activo</SelectItem>
                            <SelectItem value="Inactivo">Inactivo</SelectItem>
                            <SelectItem value="Suspendido">Suspendido</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                )}
              </div>
            </form>
          )}
        </div>

        <SheetFooter className="px-6 pb-6 pt-4 border-t border-border/60 bg-muted/30">
          <div className="flex w-full justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              disabled={isPending} 
              onClick={closeSheet}
              className="h-9 px-4"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              form="form-usuario" 
              disabled={isPending || isLoadingQuery}
              className="h-9 px-5"
            >
              {isPending ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Guardando...
                </>
              ) : (isEditing ? "Actualizar" : "Crear")}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}