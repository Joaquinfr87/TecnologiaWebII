<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CuentaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->Id_Cuenta,
            'saldo' => $this->Saldo,
            'usuarioId' => $this->Id_Usuario,
        ];
    }
}
