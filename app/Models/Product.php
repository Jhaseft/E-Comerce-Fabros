<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'longDescription',
        'available',
        'precio_anterior',
        'precio_actual',
    ];

    protected $casts = [
        'available' => 'boolean',
        'precio_anterior' => 'decimal:0',
        'precio_actual' => 'decimal:0',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function multimedia()
    {
        return $this->hasMany(ProductMultimedia::class);
    }

    public function caracteristicas()
    {
        return $this->hasMany(Caracteristica::class);
    }
}
