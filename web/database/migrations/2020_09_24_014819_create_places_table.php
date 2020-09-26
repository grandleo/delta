<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->foreignId('manager_id')->constrained();
            $table->foreignId('place_category_id')->constrained();
            $table->unsignedTinyInteger('status')->default(0);
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->string('descr_short')->nullable();
            $table->string('currency', 10)->default('RUB');
            $table->unsignedSmallInteger('sort')->default(0);
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
        Schema::dropIfExists('places');
    }
}
