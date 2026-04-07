import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCuentaSaldo } from "../services/cuentas.api"

export function useUpdateCuentaSaldoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, saldo }: { id: number; saldo: number }) =>
      updateCuentaSaldo(id, saldo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cuentas"],
      })
    },
  })
}
