<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_id')->nullable()->constrained();
            $table->foreignId('place_id')->constrained();
            $table->foreignId('table_id')->nullable()->constrained();
            $table->foreignId('worker_id')->nullable()->constrained();
            $table->unsignedTinyInteger('status')->default(0);
            $table->string('currency', 10)->default('RUB');
            $table->unsignedInteger('amount');
            $table->json('params')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
