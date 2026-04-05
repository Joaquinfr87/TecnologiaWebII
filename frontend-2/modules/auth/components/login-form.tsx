"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginForm as LoginFormType } from "../schemas/auth.schema"
import { useLoginMutation } from "../hooks/use-auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {mutate: loginUser,isPending,isError,error} = useLoginMutation()
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
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Accede a tu cuenta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Introduce el email que pertenezca a tu cuenta
          </p>
        </div>
        {isError && (
          <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
            {error instanceof Error ? error.message : "Error al iniciar sesión. Verifica tus credenciales."}
          </div>
        )}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="joaquin@upds.com"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
              <FieldDescription className="underline-offset-4"><a href="#">Olvidaste tu contrasena</a></FieldDescription>
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <FieldSeparator></FieldSeparator>
        <Field>
          <FieldDescription className="text-center">{" "}
            <a href="#" className="underline underline-offset-4">
              Registrate
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
