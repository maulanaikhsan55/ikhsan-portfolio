<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['company', 'company_logo', 'role', 'period', 'desc', 'achievements'];

    protected $casts = [
        'achievements' => 'array',
    ];
}
