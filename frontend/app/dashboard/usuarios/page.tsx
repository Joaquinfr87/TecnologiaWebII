import UsuariosClient from "./UsuariosClient";
import {Usuario} from "@/lib/types/Usuario"

async function getData(): Promise<Usuario[]> {
 try {
    const res = await fetch("http://localhost:8000/api/users");
    
    if (!res.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const json = await res.json();
    const data = json.data ?? json;
    
    return data;

  } catch (error) {
    console.error(error);
    return [];
  }
}


export default async function Page() {
  const data = await getData()


  return (
  <UsuariosClient data={data}/>   
  )
}
