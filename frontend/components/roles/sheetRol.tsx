"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Rol as RolInterface } from "@/lib/types/Rol";
import { Rol, RolSchema } from "@/lib/schemas/rol.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface SheetRolProps {
  open: boolean
  setOpen: (open: boolean) => void
  rol: RolInterface | undefined
  setRol: (rol: RolInterface | undefined) => void
}


export default function SheetRol({ open, setOpen, rol, setRol }: SheetRolProps) {

  const router = useRouter();
  const form = useForm<Rol>({
    resolver: zodResolver(RolSchema),
    defaultValues: {
      nombre: ""
    },
  })
  useEffect(() => {
    if (open) {
      form.reset({
        nombre: rol?.nombre ?? ""
      })
    }
    else {
      form.clearErrors();
    }
  }, [form, rol, open])
  async function onSubmit(data: Rol) {
    let res;
    try {
      if (rol) {
        res = await fetch("http://localhost:8000/api/roles/" + rol.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        })
      } else {
        res = await fetch("http://localhost:8000/api/roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
      }
      if (!res.ok) {
        const error = await res.json()
        console.error("Error backend", error)
        return
      }

      const result = await res.json()
      console.log(rol ? "Rol actualizado:" : "Rol Creado", result)

      setOpen(false);
      setRol(undefined);
    } catch (err) {
      console.error("Error de red:", err)
    }
    router.refresh()
  }
  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger
        onClick={() => {
          setRol(undefined);
        }}
      >Crear Rol</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear Rol</SheetTitle>
          <SheetDescription>Form para crer Rol</SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-rol">
          <Controller
            name="nombre"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
        <SheetFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset({
                nombre: ""
              }
              )}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rol">
              {rol ? "Actualizar" : "Crear"}
            </Button>
          </Field>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

