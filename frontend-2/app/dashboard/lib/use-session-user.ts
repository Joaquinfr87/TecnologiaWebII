import { useQuery } from "@tanstack/react-query"
import { sessionQueryOptions } from "@/modules/auth/services/auth.queries"
import { SessionUser } from "@/modules/auth/schemas/auth.schema"

export function useSessionUser() {
  return useQuery(sessionQueryOptions())
}
