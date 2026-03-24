import z from "zod";
const Estado = z.enum(['Activo', 'Inactivo', 'Suspendido']);

export const UsuarioSchema = z.object({
  nombres: z.string()
    .min(1, "Los nombres son requeridos")
    .max(100, "Máximo 100 caracteres permitidos"),

  apellidos: z.string()
    .min(1, "Los apellidos son requeridos")
    .max(100, "Máximo 100 caracteres permitidos"),

  carnetIdentidad: z.string()
    .min(4, "El carnet debe tener al menos 4 caracteres")
    .max(20, "Máximo 20 caracteres permitidos"),

  // z.coerce.date() es ideal aquí porque los datos de formularios HTML 
  // llegan como strings y esto los convierte automáticamente a objetos Date
  fechaNacimiento: z.date({
    error: issue => issue.input === undefined ? "La fecha de nacimiento es requerida" : "Dato invalido"
  }),
  estado: Estado,
})

export type Usuario = z.infer<typeof UsuarioSchema>;
