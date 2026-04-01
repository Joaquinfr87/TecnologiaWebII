<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TarjetaNFCResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uidNfc' => $this->UID_NFC,
            'usuarioId' => $this->Id_Usuario,
            'estado' => $this->Estado,
        ];
    }
}
