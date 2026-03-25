export interface Usuario {
  id:number
  nombres:string
  apellidos:string
  carnetIdentidad:string
  fechaNacimiento:Date
  rolId:number
  estado: "Activo"|"Inactivo"|"Suspendido"
}
