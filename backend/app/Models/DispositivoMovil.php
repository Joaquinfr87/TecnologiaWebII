<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DispositivoMovil extends Model
{
    protected $table = 'Dispositivo_Movil';
    protected $primaryKey = 'Id_Dispositivo';
    public $timestamps = false;

    protected $fillable = [
        'Id_Usuario',
        'Modelo_App',
        'Marca_Modelo',
        'Estado'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'Id_Usuario', 'Id_Usuario');
    }

    public function transaccionesOrigen()
    {
        return $this->hasMany(Transaccion::class, 'Id_Dispositivo_Origen', 'Id_Dispositivo');
    }

    public function transaccionesDestino()
    {
        return $this->hasMany(Transaccion::class, 'Id_Dispositivo_Destino', 'Id_Dispositivo');
    }
}
