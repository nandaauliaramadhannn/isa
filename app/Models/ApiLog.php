<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ApiLog extends Model
{
    use HasFactory,HasUuids;

    protected $guarded = [];

    public function apiKey()
    {
        return $this->belongsTo(ApiKey::class);
    }
}
