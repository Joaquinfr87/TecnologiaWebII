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

export const rolSchema = z.object({
  id:z.number(),
  nombre:z.string(),
})
export const usuarioSchema = formularioUsuarioSchema.omit({rolId:true}).extend({
  id: z.string().uuid("El formato del id es invalido"),
  rol: rolSchema,
  //id:z.number()
})

export type Usuario = z.infer<typeof usuarioSchema>; 



export const filtrosUsuariosSchema = z.object({
  search: z.string().trim().min(1).optional(),
  estado: Estado.optional(),
  rolId: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(["nombre", "email", "estado", "rol"]).optional(),
  sortDir: z.enum(["asc", "desc"]).default("asc"),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  page: z.coerce.number().int().min(1).default(1),
})

export type FiltrosUsuario = z.infer<typeof filtrosUsuariosSchema>

export const usuarioResponseSchema=z.object({
  data: z.array(usuarioSchema),

  meta: z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total:z.number()
  }).optional(),
})

export type UsuarioResponse = z.infer<typeof usuarioResponseSchema>
