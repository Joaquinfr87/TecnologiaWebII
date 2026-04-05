import { z } from "zod";
import { formularioUsuarioSchema } from "../../usuario/schemas/usuario.schema";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Correo electrónico inválido"),
  contrasena: z.string().min(1, "La contraseña es requerida"),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = formularioUsuarioSchema
  .omit({ estado: true })
  .extend({
    contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    contrasena_confirmacion: z.string(),
  })
  .refine((data) => data.contrasena === data.contrasena_confirmacion, {
    message: "Las contraseñas no coinciden",
    path: ["contrasena_confirmacion"],
  });

export type RegisterFormType = z.infer<typeof registerSchema>;

export const authResponseSchema = z.object({
  message: z.string().optional(),
  access_token: z.string(),
  token_type: z.string(),
  user: z.object({
    id: z.string().uuid("El formato del Id debe ser un uuid valido"),
    name: z.string(),
    email: z.string(),
    role: z.number().optional(), // El login no devuelve role, el register sí
  }),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.coerce.number().optional(),
});

// Exportamos el tipo para usarlo en TypeScript
export type SessionUser = z.infer<typeof sessionUserSchema>;
