export type Usuario = {
  nombres:string,
  apellidos:string,
  carnetIdentidad:string,
  fechaNacimiento:Date,
  estado: "Activo"|"Inactivo"|"Suspendido",
}
