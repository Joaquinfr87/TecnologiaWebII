<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Tarifa', function (Blueprint $table) {
            $table->integer('Id_Tarifa', true);
            $table->decimal('Monto', 8, 2);
            $table->enum('Estado', ['Activa', 'Inactiva'])->default('Activa');
            $table->integer('Id_Rol');
            
            $table->foreign('Id_Rol')->references('Id_Rol')->on('Rol')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Tarifa');
    }
};
