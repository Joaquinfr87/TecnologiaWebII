export const ROLE_ADMIN = 1
export const ROLE_CHOFER = 5
export const ROLE_ESTUDIANTES = [2, 3, 4]

export const isAdmin = (role?: number) => role === ROLE_ADMIN
export const isChofer = (role?: number) => role === ROLE_CHOFER
export const isEstudiante = (role?: number) => role !== undefined && ROLE_ESTUDIANTES.includes(role)
