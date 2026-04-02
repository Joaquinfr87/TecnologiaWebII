<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TarifaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->Id_Tarifa,
            'monto' => $this->Monto,
            'estado' => $this->Estado,
            'rolId' => $this->Id_Rol,
        ];
    }
}
