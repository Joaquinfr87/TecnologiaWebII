import z from "zod";

export const RolSchema = z.object({
  nombre: z.string()
    .min(1, "Los nombres son requeridos")
    .max(100, "Máximo 100 caracteres permitidos"),
})

export type Rol = z.infer<typeof RolSchema>;
