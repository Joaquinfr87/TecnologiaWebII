<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'Usuario';
    protected $primaryKey = 'Id_Usuario';
    public $timestamps = false;

    protected $fillable = [
        'Nombres',
        'Apellidos',
        'Carnet_Identidad',
        'Correo_Electronico',
        'Fecha_Nacimiento',
        'Contrasena',
        'Id_Rol',
        'Estado',
    ];

    protected $hidden = [
        'Contrasena',
    ];
}
