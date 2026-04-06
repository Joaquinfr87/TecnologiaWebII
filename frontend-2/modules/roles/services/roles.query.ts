import { queryOptions } from "@tanstack/react-query"
import { fetchRol, fetchRoles } from "./roles.api";


export const rolKeys = {
  all: ["roles"] as const,
  list: () => [...rolKeys.all,"list"] as const,
  details: () => [...rolKeys.all, "details"] as const,
  detail: (id: number) => [...rolKeys.details(), id] as const,
}

export function rolesListQueryOptions() {
  return queryOptions({
    queryKey: rolKeys.list(),
    queryFn: fetchRoles,
    staleTime: 5 * 60 * 1000,
  })
}

export function rolQueryOptions(id: number) {
  return queryOptions({
    queryKey: rolKeys.detail(id),
    queryFn: () => fetchRol(id),
    staleTime: 5 * 60 * 1000,
  })
}

