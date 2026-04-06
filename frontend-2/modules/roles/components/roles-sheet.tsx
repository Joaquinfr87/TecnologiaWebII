// modules/roles/components/sheet-rol.tsx
"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { rolQueryOptions } from "../services/roles.query"
import { useCreateRolMutation, useUpdateRolMutation } from "../hooks/use-roles"
import { formRolschema , FormRolType} from "../schemas/roles.schema"

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
    resolver: zodResolver(formRolschema),
    defaultValues: { nombre: "" },
  })

  useEffect(() => {
    if (rolIdParam === "new") {
      form.reset({ nombre: "" })
    } else if (rolData) {
      form.reset({ nombre: rolData.nombre }) 
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? "Editar Rol" : "Crear Rol"}</SheetTitle>
          <SheetDescription>
            {isEditing ? `Modificando el rol ID: ${numericId}` : "Crea un nuevo rol en el sistema."}
          </SheetDescription>
        </SheetHeader>

        {isLoadingQuery ? (
          <div className="py-10 text-center text-muted-foreground">Cargando datos...</div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} id="form-rol" className="py-6">
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nombre del Rol</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>
        )}

        <SheetFooter>
          <div className="flex w-full justify-end gap-2">
            <Button type="button" variant="outline" disabled={isPending} onClick={closeSheet}>
              Cancelar
            </Button>
            <Button type="submit" form="form-rol" disabled={isPending || isLoadingQuery}>
              {isPending ? "Guardando..." : (isEditing ? "Actualizar" : "Crear")}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
