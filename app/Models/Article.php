<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'text',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');   
    }

    public function images() {
        return $this->belongsTo(Image::class, 'article_id');
    }
}

