import z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  contrasena: z.string()
})

export type LoginType = z.infer<typeof LoginSchema>;
