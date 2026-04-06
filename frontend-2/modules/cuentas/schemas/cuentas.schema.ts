import { z } from "zod";

export const cuentaSchema = z.object({
  id: z.number(),
  saldo: z.coerce.number(),
  usuarioId: z.string().uuid(),
});

export type CuentaType = z.infer<typeof cuentaSchema>;

export const cuentasResponseSchema = z.object({
  data: z.array(cuentaSchema),
});

export type CuentasResponseType = z.infer<typeof cuentasResponseSchema>;