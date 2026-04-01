<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    protected $table = 'Cuenta';
    protected $primaryKey = 'Id_Cuenta';
    public $timestamps = false;

    protected $fillable = [
        'Saldo',
        'Id_Usuario'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'Id_Usuario', 'Id_Usuario');
    }

    public function transaccionesOrigen()
    {
        return $this->hasMany(Transaccion::class, 'Id_Cuenta_Origen', 'Id_Cuenta');
    }

    public function transaccionesDestino()
    {
        return $this->hasMany(Transaccion::class, 'Id_Cuenta_Destino', 'Id_Cuenta');
    }
}
