import {z} from "zod"

export const formTarifasSchema = z.object({
  monto: z.number(),
  estado: z.enum(["Activa", "Inactiva"]).optional().default("Activa"),
  rolId: z.number()
})

export type FormTarifasType = z.infer<typeof formTarifasSchema>
