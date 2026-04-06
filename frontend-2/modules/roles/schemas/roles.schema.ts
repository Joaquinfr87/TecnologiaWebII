import z from "zod";

export const rolSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  tarifa: z.object({
    monto: z.coerce.number().min(0).optional(),
    estado: z.enum(["Activa", "Inactiva"]).optional(),
  }).nullable().optional()
})

export type RolType = z.infer<typeof rolSchema>;

export const formRolSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tarifa: z.object({
    monto: z.coerce.number().min(0).optional(),
    estado: z.enum(["Activa", "Inactiva"]).optional(),
  }).optional()
})

export type FormRolType = z.infer<typeof formRolSchema>



export const rolesResponseSchema = z.object({
  data: z.array(rolSchema)
})

export type RolesResponseType = z.infer<typeof rolesResponseSchema>
