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
        Schema::dropIfExists('episodes');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->text('description'); 
            $table->foreignId('podcast_id')->constrained()->onDelete('cascade'); 
            $table->string('audio_file'); 
            $table->timestamps();
        });
    }
};
