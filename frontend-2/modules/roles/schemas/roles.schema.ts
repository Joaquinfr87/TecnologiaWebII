import z from "zod";

export const rolSchema = z.object({
  id: z.number(),
  nombre: z.string()
})

export const formRolschema = z.object({
  nombre: z.string().min(1,"El nombre es requerido")
})

export type FormRolType = z.infer<typeof formRolschema>


export type RolType = z.infer<typeof rolSchema>;

export const rolesResponseSchema = z.object({
  data: z.array(rolSchema)
})

export type RolesResponseType = z.infer<typeof rolesResponseSchema>
