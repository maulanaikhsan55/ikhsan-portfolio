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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->text('long_description');
            $table->string('image');
            $table->string('category');
            $table->json('tech');
            $table->string('year');
            $table->string('duration');
            $table->string('client');
            $table->string('role');
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('features');
            $table->json('screenshots');
            $table->text('challenges');
            $table->text('solution');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
