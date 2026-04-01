<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('TarjetaNFC', function (Blueprint $table) {
            $table->string('UID_NFC', 50)->primary();
            $table->integer('Id_Usuario');
            $table->enum('Estado', ['Activa', 'Inactiva', 'Perdida'])->default('Activa');
            
            $table->foreign('Id_Usuario')->references('Id_Usuario')->on('Usuario')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('TarjetaNFC');
    }
};
