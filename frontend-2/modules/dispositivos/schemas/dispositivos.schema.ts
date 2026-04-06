import { z } from "zod";

export const dispositivoSchema = z.object({
  id: z.number(),
  usuarioId: z.string().uuid(),
  modeloApp: z.string(),
  marcaModelo: z.string(),
  fechaRegistro: z.string(),
  estado: z.enum(["Activo", "Inactivo", "Bloqueado"]),
});

export type DispositivoType = z.infer<typeof dispositivoSchema>;

export const dispositivosResponseSchema = z.object({
  data: z.array(dispositivoSchema),
});

export type DispositivosResponseType = z.infer<typeof dispositivosResponseSchema>;