<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Cuenta', function (Blueprint $table) {
            $table->integer('Id_Cuenta', true);
            $table->decimal('Saldo', 10, 2)->default(0.00);
            $table->integer('Id_Usuario')->unique();
            
            $table->foreign('Id_Usuario')->references('Id_Usuario')->on('Usuario')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Cuenta');
    }
};
