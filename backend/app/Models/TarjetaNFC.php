<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TarjetaNFC extends Model
{
    protected $table = 'TarjetaNFC';
    protected $primaryKey = 'UID_NFC';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'UID_NFC',
        'Id_Usuario',
        'Estado'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'Id_Usuario', 'Id_Usuario');
    }

    public function transacciones()
    {
        return $this->hasMany(Transaccion::class, 'UID_NFC', 'UID_NFC');
    }
}
