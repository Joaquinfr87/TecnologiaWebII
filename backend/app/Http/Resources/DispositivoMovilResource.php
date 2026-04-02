<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DispositivoMovilResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->Id_Dispositivo,
            'usuarioId' => $this->Id_Usuario,
            'modeloApp' => $this->Modelo_App,
            'marcaModelo' => $this->Marca_Modelo,
            'fechaRegistro' => $this->Fecha_Registro,
            'estado' => $this->Estado,
        ];
    }
}
