"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, Controller } from "react-hook-form"
import { LoginSchema, LoginType } from "@/lib/schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useRouter } from "next/navigation"
import { loginAction } from "@/app/actions/auth.actions"


export function CardLogin() {
  const router = useRouter()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      contrasena: ""
    }
  })
  async function onSubmit(data: LoginType) {
    const result = await loginAction(data);

    if (result.error) {
      // Mostrar error en la UI (puedes usar un toast o setear un error en el form)
      form.setError("root", { message: result.error });
      return;
    }

    router.push('/dashboard')
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Inicio de Sesion</CardTitle>
        <CardDescription>
          Ingresa tu email para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-login">
          <div className="flex flex-col gap-6">
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="form-login" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
