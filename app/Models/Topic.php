<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Topic extends Model
{
    use HasFactory,HasUuids;

    protected $guarded = [];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
