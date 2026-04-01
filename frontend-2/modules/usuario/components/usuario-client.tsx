"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { usuariosListQueryOptions } from "@/modules/usuario/services/usuario.queries";
import { FiltrosUsuario } from "@/modules/usuario/schemas/usuario.schema";

interface Props {
  initialFiltros: FiltrosUsuario;
}

export default function UsuarioClient({ initialFiltros }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Estado local SÓLO para el input de texto (para que puedas escribir sin lag)
  const [searchTerm, setSearchTerm] = useState(initialFiltros.search || "");

  // 2. React Query reaccionará automáticamente cuando la prop 'initialFiltros' cambie
  const { data: queryResponse, isLoading, isFetching } = useQuery(usuariosListQueryOptions(initialFiltros));

  // 3. FUNCIÓN CORE: Actualiza la URL
  const updateFilter = (key: string, value: string | null) => {
    // Clonamos los parámetros actuales de la URL
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key); // Si el valor está vacío, quitamos el filtro de la URL
    } else {
      current.set(key, value); // Si hay valor, lo actualizamos
    }

    // Regla de UX: Si cambias un filtro (ej. buscar otra cosa), 
    // debes volver a la página 1 para no quedarte en una página vacía.
    if (key !== "page") {
      current.delete("page");
    }

    // Empujamos la nueva URL al navegador (sin recargar la página entera)
    router.push(`${pathname}?${current.toString()}`);
  };

  // 4. Manejadores de eventos
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", searchTerm);
  };

  const currentPage = initialFiltros.page || 1;
  const usuarios = queryResponse?.data ?? [];
  const meta = queryResponse?.meta;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>

      {/* --- PANEL DE FILTROS --- */}
      <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-md border">
        
        {/* Filtro de Búsqueda */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </form>

        {/* Filtro de Estado */}
        <select
          value={initialFiltros.estado || ""}
          onChange={(e) => updateFilter("estado", e.target.value)}
          className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Suspendido">Suspendido</option>
        </select>

        {/* Indicador de carga sutil */}
        {isFetching && <span className="text-sm text-gray-500 animate-pulse">Actualizando...</span>}
      </div>

      {/* --- RESULTADOS --- */}
      <div className="bg-white border rounded-md p-4 min-h-[200px]">
        {isLoading ? (
          <p className="text-gray-500">Cargando datos iniciales...</p>
        ) : usuarios.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No se encontraron usuarios con estos filtros.</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
            {JSON.stringify(usuarios, null, 2)}
          </pre>
        )}
      </div>

      {/* --- PAGINACIÓN BÁSICA --- */}
      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={() => updateFilter("page", String(currentPage - 1))}
          disabled={currentPage <= 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Anterior
        </button>
        
        <span className="text-sm text-gray-600">
          Página {currentPage} {meta?.last_page ? `de ${meta.last_page}` : ""}
        </span>
        
        <button
          onClick={() => updateFilter("page", String(currentPage + 1))}
          disabled={!meta?.last_page || currentPage >= meta.last_page}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Siguiente
        </button>
      </div>

    </div>
  );
}
