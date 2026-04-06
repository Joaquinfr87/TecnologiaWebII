<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tarifa;

class TarifaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2: Estudiante Primaria
        Tarifa::create([
            'Monto' => 0.50,
            'Estado' => 'Activa',
            'Id_Rol' => 2
        ]);

        // 3: Estudiante Secundaria
        Tarifa::create([
            'Monto' => 1.00,
            'Estado' => 'Activa',
            'Id_Rol' => 3
        ]);

        // 4: Estudiante Universidad
        Tarifa::create([
            'Monto' => 1.50,
            'Estado' => 'Activa',
            'Id_Rol' => 4 
        ]);
    }
}
