<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Transaccion', function (Blueprint $table) {
            $table->integer('Id_Transaccion', true);
            $table->integer('Id_Cuenta_Origen')->nullable();
            $table->integer('Id_Cuenta_Destino')->nullable();
            $table->string('UID_NFC', 50)->nullable();
            $table->integer('Id_Dispositivo_Origen')->nullable();
            $table->integer('Id_Dispositivo_Destino')->nullable();
            $table->decimal('Monto', 8, 2);
            $table->enum('Tipo', ['Pago_Pasaje', 'Recarga_Saldo']);
            $table->timestamp('Fecha')->useCurrent();
            
            $table->foreign('Id_Cuenta_Origen')->references('Id_Cuenta')->on('Cuenta')->onDelete('set null');
            $table->foreign('Id_Cuenta_Destino')->references('Id_Cuenta')->on('Cuenta')->onDelete('set null');
            $table->foreign('UID_NFC')->references('UID_NFC')->on('TarjetaNFC')->onDelete('set null');
            $table->foreign('Id_Dispositivo_Origen')->references('Id_Dispositivo')->on('Dispositivo_Movil')->onDelete('set null');
            $table->foreign('Id_Dispositivo_Destino')->references('Id_Dispositivo')->on('Dispositivo_Movil')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Transaccion');
    }
};
