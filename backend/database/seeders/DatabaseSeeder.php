<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Primero creamos los 3 roles (Administrador, Estudiante, Chofer)
        $this->call(RolSeeder::class);

        // Luego creamos el usuario admin de prueba con el Rol 1 (Administrador)
        User::create([
            'Nombres' => 'Admin',
            'Apellidos' => 'Prueba',
            'Carnet_Identidad' => '9999999',
            'Correo_Electronico' => 'admin@test.com',
            'Fecha_Nacimiento' => '1990-01-01',
            'Contrasena' => Hash::make('123456'),
            'Id_Rol' => 1,
            'Estado' => 'Activo',
        ]);
    }
}
