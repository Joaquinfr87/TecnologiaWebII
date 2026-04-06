import { apiClient } from "@/lib/api/api-client";
import { TransaccionType, transaccionesResponseSchema } from "../schemas/transacciones.schema";

export async function fetchTransacciones(): Promise<TransaccionType[]> {
  const res = await apiClient("/transacciones");
  if (!res.ok) throw new Error("Fallo al traer transacciones");

  const data = await res.json();
  try {
    return transaccionesResponseSchema.parse(data).data;
  } catch (error) {
    console.error("Zod error en fetchTransacciones:", error);
    throw error;
  }
}