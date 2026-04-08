<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Cuenta;
use App\Models\Transaccion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatosPruebaSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->command->info('Creando usuarios de prueba...');
        
        $defaultPassword = Hash::make('123456');
        
        // 1. Crear 500 usuarios de prueba uno por uno
        $usuariosCreados = [];
        for ($i = 1; $i <= 500; $i++) {
            $rol = match(true) {
                $i <= 10 => 1,
                $i <= 60 => 3,
                default => 2,
            };
            
            $usuario = User::create([
                'Id_Usuario' => \Illuminate\Support\Str::uuid()->toString(),
                'Nombres' => fake()->firstName(),
                'Apellidos' => fake()->lastName(),
                'Carnet_Identidad' => (string) fake()->unique()->numerify('##########'),
                'Correo_Electronico' => "usuario{$i}@test.com",
                'Fecha_Nacimiento' => fake()->date('Y-m-d', '-18 years'),
                'Contrasena' => $defaultPassword,
                'Id_Rol' => $rol,
                'Estado' => fake()->randomElement(['Activo', 'Activo', 'Activo', 'Inactivo']),
            ]);
            
            $usuariosCreados[] = $usuario;
            
            if ($i % 50 === 0) {
                $this->command->info("Usuarios creados: {$i}/500");
            }
        }
        
        $this->command->info('Creando cuentas...');
        
        // 2. Crear una cuenta por cada usuario
        $cuentasCreadas = [];
        foreach ($usuariosCreados as $index => $usuario) {
            $cuenta = Cuenta::create([
                'Saldo' => fake()->randomFloat(2, 0, 500),
                'Id_Usuario' => $usuario->Id_Usuario,
            ]);
            $cuentasCreadas[] = $cuenta;
            
            if (($index + 1) % 50 === 0) {
                $this->command->info("Cuentas creadas: " . ($index + 1) . "/500");
            }
        }
        
        $this->command->info('Creando 10,000 transacciones...');
        
        // 3. Crear transacciones en lotes de 1000
        $totalTransacciones = 10000;
        $lote = 1000;
        
        for ($batch = 0; $batch < ($totalTransacciones / $lote); $batch++) {
            for ($i = 0; $i < $lote; $i++) {
                $cuentaOrigen = $cuentasCreadas[array_rand($cuentasCreadas)];
                $cuentaDestino = $cuentasCreadas[array_rand($cuentasCreadas)];
                
                // Evitar que origen y destino sean la misma cuenta
                while ($cuentaOrigen->Id_Cuenta === $cuentaDestino->Id_Cuenta) {
                    $cuentaDestino = $cuentasCreadas[array_rand($cuentasCreadas)];
                }
                
                Transaccion::create([
                    'Id_Cuenta_Origen' => $cuentaOrigen->Id_Cuenta,
                    'Id_Cuenta_Destino' => $cuentaDestino->Id_Cuenta,
                    'Monto' => fake()->randomFloat(2, 1, 50),
                    'Tipo' => fake()->randomElement(['Pago_Pasaje', 'Recarga_Saldo']),
                    'Fecha' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d H:i:s'),
                ]);
            }
            
            $progress = ($batch + 1) * $lote;
            $this->command->info("Transacciones creadas: {$progress}/{$totalTransacciones}");
        }
        
        $this->command->info('¡Datos de prueba creados exitosamente!');
        $this->command->info('- Usuarios: 500');
        $this->command->info('- Cuentas: 500');
        $this->command->info('- Transacciones: 10,000');
    }
}