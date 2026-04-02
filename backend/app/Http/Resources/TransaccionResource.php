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
            'uidNfc' => $this->UID_NFC,
            'idDispositivoOrigen' => $this->Id_Dispositivo_Origen,
            'idDispositivoDestino' => $this->Id_Dispositivo_Destino,
            'monto' => $this->Monto,
            'tipo' => $this->Tipo,
            'fecha' => $this->Fecha,
        ];
    }
}
