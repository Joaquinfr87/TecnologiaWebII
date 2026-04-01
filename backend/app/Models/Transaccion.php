<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaccion extends Model
{
    protected $table = 'Transaccion';
    protected $primaryKey = 'Id_Transaccion';
    public $timestamps = false;

    protected $fillable = [
        'Id_Cuenta_Origen',
        'Id_Cuenta_Destino',
        'UID_NFC',
        'Id_Dispositivo_Origen',
        'Id_Dispositivo_Destino',
        'Monto',
        'Tipo',
        'Fecha'
    ];

    public function cuentaOrigen()
    {
        return $this->belongsTo(Cuenta::class, 'Id_Cuenta_Origen', 'Id_Cuenta');
    }

    public function cuentaDestino()
    {
        return $this->belongsTo(Cuenta::class, 'Id_Cuenta_Destino', 'Id_Cuenta');
    }

    public function tarjetaNFC()
    {
        return $this->belongsTo(TarjetaNFC::class, 'UID_NFC', 'UID_NFC');
    }

    public function dispositivoOrigen()
    {
        return $this->belongsTo(DispositivoMovil::class, 'Id_Dispositivo_Origen', 'Id_Dispositivo');
    }

    public function dispositivoDestino()
    {
        return $this->belongsTo(DispositivoMovil::class, 'Id_Dispositivo_Destino', 'Id_Dispositivo');
    }
}
