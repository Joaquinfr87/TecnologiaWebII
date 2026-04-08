<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use App\Models\Transaccion;
use App\Http\Resources\TransaccionResource;
use Illuminate\Http\Request;

class TransaccionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaccion::query();

        // Búsqueda general (por ID o monto)
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('Id_Transaccion', 'like', "%{$search}%")
                  ->orWhere('Monto', 'like', "%{$search}%");
            });
        }

        // Filtro por cuenta (origen o destino)
        if ($request->has('cuentaId') && $request->cuentaId) {
            $cuentaId = $request->cuentaId;
            $query->where(function($q) use ($cuentaId) {
                $q->where('Id_Cuenta_Origen', $cuentaId)
                  ->orWhere('Id_Cuenta_Destino', $cuentaId);
            });
        }

        // Filtro por cuenta (solo origen)
        if ($request->has('origen') && $request->origen) {
            $query->whereNotNull('Id_Cuenta_Origen');
        }

        // Filtro por cuenta (solo destino)
        if ($request->has('destino') && $request->destino) {
            $query->whereNotNull('Id_Cuenta_Destino');
        }

        // Filtro por rango de fechas
        if ($request->has('fechaDesde') && $request->fechaDesde) {
            $query->where('Fecha', '>=', $request->fechaDesde . ' 00:00:00');
        }

        if ($request->has('fechaHasta') && $request->fechaHasta) {
            $query->where('Fecha', '<=', $request->fechaHasta . ' 23:59:59');
        }

        // Mapeo de campos de ordenamiento
        $sortMap = [
            'id' => 'Id_Transaccion',
            'monto' => 'Monto',
            'fecha' => 'Fecha',
        ];

        $sortByInput = $request->get('sortBy', 'fecha');
        $sortBy = $sortMap[$sortByInput] ?? 'Fecha';
        $sortDir = $request->get('sortDir', 'desc');

        if (!in_array($sortDir, ['asc', 'desc'])) {
            $sortDir = 'desc';
        }

        $query->orderBy($sortBy, $sortDir);

        // Paginación
        $perPage = $request->get('perPage', 10);
        $transacciones = $query->paginate($perPage);

        return response()->json([
            'data' => TransaccionResource::collection($transacciones)->resolve(),
            'meta' => [
                'current_page' => $transacciones->currentPage(),
                'last_page' => $transacciones->lastPage(),
                'per_page' => $transacciones->perPage(),
                'total' => $transacciones->total(),
            ],
        ]);
    }

    public function showByUsuario($idUsuario)
    {
        // Encontrar la cuenta del usuario
        $cuenta = Cuenta::where('Id_Usuario', $idUsuario)->first();

        if (!$cuenta) {
            return response()->json([
                'status' => 'error',
                'mensaje' => 'Cuenta no encontrada para este usuario'
            ], 404);
        }

        // Obtener transacciones relacionadas a esta cuenta
        $transacciones = Transaccion::where('Id_Cuenta_Origen', $cuenta->Id_Cuenta)
            ->orWhere('Id_Cuenta_Destino', $cuenta->Id_Cuenta)
            ->orderBy('Fecha', 'desc')
            ->get();

        return response()->json([
            'status' => 'ok',
            'data' => TransaccionResource::collection($transacciones)
        ], 200);
    }
}