<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Rol', function (Blueprint $table) {
            $table->integer('Id_Rol', true);
            $table->string('Nombre', 50)->unique();
        });

        Schema::create('Usuario', function (Blueprint $table) {
            $table->uuid('Id_Usuario')->primary();
            $table->string('Nombres', 100);
            $table->string('Apellidos', 100);
            $table->string('Carnet_Identidad', 20)->unique();
            $table->string('Correo_Electronico', 100)->unique();
            $table->date('Fecha_Nacimiento');
            $table->string('Contrasena', 255)->nullable();
            $table->integer('Id_Rol');
            $table->enum('Estado', ['Activo', 'Inactivo'])->default('Activo');

            $table->foreign('Id_Rol')->references('Id_Rol')->on('Rol');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Usuario');
        Schema::dropIfExists('Rol');
    }
};
