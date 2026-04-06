import { apiClient } from "@/lib/api/api-client";
import { CuentaType, cuentasResponseSchema } from "../schemas/cuentas.schema";

export async function fetchCuentas(): Promise<CuentaType[]> {
  const res = await apiClient("/cuentas");
  if (!res.ok) throw new Error("Fallo al traer cuentas");

  const data = await res.json();
  try {
    return cuentasResponseSchema.parse(data).data;
  } catch (error) {
    console.error("Zod error en fetchCuentas:", error);
    throw error;
  }
}