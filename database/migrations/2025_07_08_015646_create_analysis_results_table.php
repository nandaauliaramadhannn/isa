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
        Schema::create('analysis_results', function (Blueprint $table) {
            $table->uuid('id')->primary();
    $table->uuid('post_id');
    $table->enum('sentiment', ['positive', 'neutral', 'negative']);
    $table->string('emotion')->nullable();
    $table->json('topics')->nullable();
    $table->json('named_entities')->nullable();
    $table->float('risk_score')->nullable();
    $table->timestamp('analyzed_at')->useCurrent();
    $table->timestamps();

    $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analysis_results');
    }
};
