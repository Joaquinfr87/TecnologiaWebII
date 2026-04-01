<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
    protected $table = 'Tarifa';
    protected $primaryKey = 'Id_Tarifa';
    public $timestamps = false;

    protected $fillable = [
        'Monto',
        'Estado',
        'Id_Rol'
    ];

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'Id_Rol', 'Id_Rol');
    }
}
