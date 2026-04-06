import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRol,updateRol,deleteRol } from "../services/roles.api"
import { rolKeys } from "../services/roles.query"

import type { FormRolType } from "../schemas/roles.schema"
import { error } from "node:console"

export function useCreateRolMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormRolType) => createRol(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: rolKeys.list(),
      })
    },
  })
}
export function useUpdateRolMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data:FormRolType }) =>
      updateRol(id, data),

    onSuccess: () => {
      console.log("✅ MUTACIÓN EXITOSA. Disparando invalidación...");
      queryClient.invalidateQueries({
        queryKey: rolKeys.all,
      })
    },
    onError:(error)=>{
      console.error("Error silencioso: la mutacion fallo")
    }
  })
}

export function useDeleteRolMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteRol(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: rolKeys.list(),
      })
    },
  })
}
