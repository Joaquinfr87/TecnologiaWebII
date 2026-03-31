import { z } from "zod";

const Estado = z.enum(['Activo', 'Inactivo', 'Suspendido']);

export const formularioUsuarioSchema = z.object({
  nombres: z.string()
    .trim()
    .min(1, "Los nombres son requeridos")
    .max(100, "Máximo 100 caracteres permitidos"),

  apellidos: z.string()
    .trim()
    .min(1, "Los apellidos son requeridos")
    .max(100, "Máximo 100 caracteres permitidos"),

  carnetIdentidad: z.string()
    .trim()
    .min(4, "El carnet debe tener al menos 4 caracteres")
    .max(20, "Máximo 20 caracteres permitidos"),

  fechaNacimiento: z.coerce.date({
    message: "La fecha de nacimiento es requerida o tiene un formato inválido",
  }),

  correoElectronico: z.string({
    message: "El correo electrónico es requerido",
  })
    .trim()
    .toLowerCase()
    .email({ message: "Email inválido" }),

  rolId: z.coerce.number({
    message: "El rol es requerido y debe ser un número válido",
  }),

  estado: Estado,
});

export type FormularioUsuario = z.infer<typeof formularioUsuarioSchema>;

export const usuarioSchema = formularioUsuarioSchema.extend({
  id: z.string().uuid("El formato del id es invalido")
})

export type Usuario = z.infer<typeof usuarioSchema>; 

//Tambien se puede anadir a futuro usuarioResponseSchema con los params para filtrado de la tabla 
