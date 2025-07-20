<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Post extends Model
{
    use HasFactory,HasUuids;

    protected $guarded = [];

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function analysis()
    {
        return $this->hasOne(AnalysisResult::class);
    }
}
