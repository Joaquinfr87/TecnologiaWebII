import { z } from "zod";

export const transaccionSchema = z.object({
  id: z.number(),
  idCuentaOrigen: z.number().nullable(),
  idCuentaDestino: z.number().nullable(),
  monto: z.coerce.number(),
  fecha: z.string(),
});

export type TransaccionType = z.infer<typeof transaccionSchema>;

export const transaccionesResponseSchema = z.object({
  data: z.array(transaccionSchema),
});

export type TransaccionesResponseType = z.infer<typeof transaccionesResponseSchema>;