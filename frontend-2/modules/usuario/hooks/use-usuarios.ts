import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUsuario, updateUsuario, deleteUsuario } from "../services/usuario.api"
import { usuarioKeys } from "../services/usuario.queries"
import type { FormularioUsuario } from "../schemas/usuario.schema"

export function useCreateUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormularioUsuario) => createUsuario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usuarioKeys.all,
      })
    },
  })
}

export function useUpdateUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormularioUsuario }) =>
      updateUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usuarioKeys.all,
      })
    },
    onError: (error) => {
      console.error("Error al actualizar usuario:", error)
    }
  })
}

export function useDeleteUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteUsuario(String(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usuarioKeys.all,
      })
    },
  })
}