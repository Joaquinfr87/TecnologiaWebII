import { apiClient } from "@/lib/api/api-client";
import { DispositivoType, dispositivosResponseSchema } from "../schemas/dispositivos.schema";

export async function fetchDispositivos(): Promise<DispositivoType[]> {
  const res = await apiClient("/dispositivos");
  if (!res.ok) throw new Error("Fallo al traer dispositivos");

  const data = await res.json();
  try {
    return dispositivosResponseSchema.parse(data).data;
  } catch (error) {
    console.error("Zod error en fetchDispositivos:", error);
    throw error;
  }
}