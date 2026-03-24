"use client"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UsuarioSchema, Usuario } from "@/lib/schemas/usuario.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"


export default function SheetUsario() {
  const form = useForm<Usuario>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      carnetIdentidad: "",
      estado: "Activo",
    }
  })
 async function onSubmit(data: Usuario) {
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          rolId:1,

          // 🔴 convertir Date → string (Laravel espera esto)
          fechaNacimiento: data.fechaNacimiento
            ?.toISOString()
            .split("T")[0],
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error backend:", error);
        return;
      }

      const result = await res.json();
      console.log("Usuario creado:", result);

    } catch (err) {
      console.error("Error de red:", err);
    }
  }
  return (
    <Sheet>
      <SheetTrigger>Crear Usuario</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-usuario">
          <Controller
            name="nombres"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nombres</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} value={field.value ?? ""} />
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
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} value={field.value ?? ""} />
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
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} value={field.value ?? ""} />
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
                <Input {...field} type="date" id={field.name} aria-invalid={fieldState.invalid}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? new Date(value) : undefined);
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
            name="estado"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-estado">
                    Estado
                  </FieldLabel>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-rhf-select-estado"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Select" />
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
        </form>
        <SheetFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="form-usuario">
              Submit
            </Button>
          </Field>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

