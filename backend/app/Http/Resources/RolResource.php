<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $tarifa = $this->tarifas->where('Estado', 'Activa')->first();

        return [
            'id' => $this->Id_Rol,
            'nombre' => $this->Nombre,
            'tarifa' => $tarifa ? [
                'monto' => $tarifa->Monto,
                'estado' => $tarifa->Estado,
            ] : null,
        ];
    }
}
