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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('source_id')->nullable();
            $table->uuid('topic_id')->nullable();
            $table->uuid('location_id')->nullable();
            $table->string('external_id')->nullable()->unique();
            $table->string('platform');
            $table->text('content');
            $table->string('author')->nullable();
            $table->timestamp('posted_at')->nullable();
            $table->json('raw_data')->nullable();
            $table->timestamps();

            $table->foreign('source_id')->references('id')->on('sources')->nullOnDelete();
            $table->foreign('topic_id')->references('id')->on('topics')->nullOnDelete();
            $table->foreign('location_id')->references('id')->on('locations')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
