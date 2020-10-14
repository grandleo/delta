<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_status_phases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('place_category_id')->nullable()->constrained();
            $table->string('name');
            $table->string('color')->default('info');
            $table->unsignedSmallInteger('sort')->default(999);
            $table->json('params')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('order_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('place_category_id')->nullable()->constrained();
            $table->foreignId('place_id')->nullable()->constrained();
            $table->foreignId('order_status_phase_id')->constrained();
            $table->string('name');
            $table->string('color')->default('info');
            $table->unsignedSmallInteger('sort')->default(999);
            $table->json('params')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('order_status_id')->after('worker_id')->nullable()->constrained();
            $table->timestamp('order_status_at', 0)->after('order_status_id')->nullable();
        });

        Schema::create('order_order_status', function (Blueprint $table) {
            $table->foreignId('order_id')->constrained();
            $table->foreignId('order_status_id')->constrained();
            $table->nullableMorphs('userable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_order_status');

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['order_status_id']);
            $table->dropColumn(['order_status_id', 'order_status_at']);
        });

        Schema::dropIfExists('order_statuses');

        Schema::dropIfExists('order_status_phases');
    }
}
