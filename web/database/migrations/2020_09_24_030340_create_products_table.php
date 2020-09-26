<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('place_id')->constrained();
            $table->foreignId('product_category_id')->constrained();
            $table->unsignedTinyInteger('status')->default(0);
            $table->string('name');
            $table->string('slug');
            $table->unsignedInteger('price');
            $table->string('image')->nullable();
            $table->string('descr_short')->nullable();
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
        Schema::dropIfExists('products');
    }
}
