<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Dispositivo_Movil', function (Blueprint $table) {
            $table->integer('Id_Dispositivo', true);
            $table->uuid('Id_Usuario');
            $table->string('Modelo_App', 20);
            $table->string('Marca_Modelo', 100);
            $table->timestamp('Fecha_Registro')->useCurrent();
            $table->enum('Estado', ['Activo', 'Inactivo', 'Bloqueado'])->default('Activo');
            
            $table->foreign('Id_Usuario')->references('Id_Usuario')->on('Usuario')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Dispositivo_Movil');
    }
};
