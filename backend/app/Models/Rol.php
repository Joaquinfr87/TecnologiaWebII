<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'Rol';
    protected $primaryKey = 'Id_Rol';
    public $timestamps = false;
    protected $fillable = ['Nombre'];

    public function tarifas()
    {
        return $this->hasMany(Tarifa::class, 'Id_Rol', 'Id_Rol');
    }
}
