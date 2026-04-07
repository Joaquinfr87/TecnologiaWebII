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
  meta: z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total: z.number()
  }).optional(),
});

export type TransaccionesResponseType = z.infer<typeof transaccionesResponseSchema>;

export const filtrosTransaccionesSchema = z.object({
  search: z.string().trim().min(1).optional(),
  cuentaId: z.coerce.number().int().positive().optional(),
  fechaDesde: z.string().optional(),
  fechaHasta: z.string().optional(),
  sortBy: z.enum(["id", "monto", "fecha"]).optional(),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  page: z.coerce.number().int().min(1).default(1),
})

export type FiltrosTransaccion = z.infer<typeof filtrosTransaccionesSchema>