import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "./auth.api";

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

export function sessionQueryOptions() {
  return queryOptions({
    queryKey: authKeys.session(),
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, 
    retry: false, 
  });
}
