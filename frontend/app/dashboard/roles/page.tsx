import RolesClient from "./RolesClient";
import {Rol} from "@/lib/types/Rol"

async function getData(): Promise<Rol[]> {
 try {
    const res = await fetch("http://localhost:8000/api/roles");
    
    if (!res.ok) {
      throw new Error("Error al obtener roles");
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
  <RolesClient data={data}/>   
  )
}
