<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransaccionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->Id_Transaccion,
            'idCuentaOrigen' => $this->Id_Cuenta_Origen,
            'idCuentaDestino' => $this->Id_Cuenta_Destino,
            'monto' => $this->Monto,
            'fecha' => $this->Fecha,
        ];
    }
}
