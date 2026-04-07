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

import { rolQueryOptions } from "../services/roles.query"
import { useCreateRolMutation, useUpdateRolMutation } from "../hooks/use-roles"
import { formRolSchema, FormRolType } from "../schemas/roles.schema"

export default function SheetRol() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rolIdParam = searchParams.get("rolId")
  const isOpen = !!rolIdParam
  const isEditing = isOpen && rolIdParam !== "new"
  const numericId = isEditing ? Number(rolIdParam) : 0

  const { mutate: createRol, isPending: isCreating } = useCreateRolMutation()
  const { mutate: updateRol, isPending: isUpdating } = useUpdateRolMutation()
  const isPending = isCreating || isUpdating

  const { data: rolData, isLoading: isLoadingQuery } = useQuery({
    ...rolQueryOptions(numericId),
    enabled: isEditing && numericId > 0,
  })

  const form = useForm<FormRolType>({
    resolver: zodResolver(formRolSchema),
    defaultValues: {
      nombre: "", 
      tarifa: {
        monto: undefined,
        estado: "Activa"
      }
    },
  })

  useEffect(() => {
    if (rolIdParam === "new") {
      form.reset({ nombre: "", tarifa: { monto: undefined, estado: "Activa" } })
    } else if (rolData) {
      form.reset({
        nombre: rolData.nombre,
        tarifa: rolData.tarifa ? {
          monto: rolData.tarifa.monto,
          estado: rolData.tarifa.estado
        } : { monto: undefined, estado: "Activa" }
      })
    }
  }, [rolIdParam, rolData, form])

  function closeSheet() {
    router.replace(pathname)
  }

  function onSubmit(data: FormRolType) {
    if (isEditing) {
      updateRol({ id: numericId, data }, { onSuccess: closeSheet })
    } else {
      createRol(data, { onSuccess: closeSheet })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="flex flex-col w-[400px] sm:max-w-[420px]">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <SheetTitle className="text-lg font-semibold tracking-tight">
            {isEditing ? "Editar rol" : "Nuevo rol"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground mt-1">
            {isEditing 
              ? `Actualiza la información del rol "${rolData?.nombre || ''}"`
              : "Define un nuevo rol para el sistema"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoadingQuery ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Cargando información...
            </div>
          ) : (
            <form id="form-rol" className="space-y-5">
              <Controller
                name="nombre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                      Nombre del rol
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      disabled={isPending}
                      placeholder="Ej: Administrador"
                      className="mt-1.5"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="mt-1.5" />
                    )}
                  </Field>
                )}
              />
              
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-medium text-foreground/80">Configuración de tarifa</h3>
                
                <Controller
                  name="tarifa.monto"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium">
                        Monto
                      </FieldLabel>
                      <div className="relative mt-1.5">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          Bs
                        </span>
                        <Input
                          type="number"
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          value={field.value ?? ""}
                          disabled={isPending}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          className="pl-8"
                          placeholder="0.00"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="mt-1.5" />
                      )}
                    </Field>
                  )}
                />
                
                {isEditing && (
                  <Controller
                    name="tarifa.estado"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel htmlFor="tarifa-estado" className="text-sm font-medium">
                            Estado de tarifa
                          </FieldLabel>
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="tarifa-estado"
                            aria-invalid={fieldState.invalid}
                            className="w-[140px]"
                          >
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value="Activa">Activa</SelectItem>
                            <SelectItem value="Inactiva">Inactiva</SelectItem>
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
              form="form-rol" 
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