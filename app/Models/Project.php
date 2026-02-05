<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug', 'title', 'description', 'long_description', 'image', 'category',
        'tech', 'year', 'duration', 'client', 'role', 'live_url', 'github_url',
        'features', 'screenshots', 'challenges', 'solution', 'featured',
        'impact', 'tools', 'awards', 'status', 'views_count'
    ];

    protected $casts = [
        'tech' => 'array',
        'features' => 'array',
        'screenshots' => 'array',
        'tools' => 'array',
        'featured' => 'boolean',
        'views_count' => 'integer',
    ];
}
