import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, register, logout } from "../services/auth.api";
import { authKeys } from "../services/auth.queries";

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess:async () => {
      // MAGIA: El login guardó el token. Ahora le decimos a React Query: 
      // "¡Oye, la sesión cambió! Ve y busca al usuario actualizado."
      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
      
      // Llevamos al usuario adentro del sistema
      router.push("/dashboard");
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session() });
      router.push("/dashboard");
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // El logout borró el token. Limpiamos la caché del usuario para que quede vacía.
      await queryClient.clear(); 
      router.push("/login");
    },
  });
}
