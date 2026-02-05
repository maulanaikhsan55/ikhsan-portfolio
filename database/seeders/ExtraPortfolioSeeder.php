<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExtraPortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Setting::updateOrCreate(
            ['key' => 'available_for_work'],
            ['value' => 'true']
        );

        \App\Models\Testimonial::create([
            'name' => 'Dr. Aris Wirawan',
            'role' => 'Head of Department',
            'company' => 'Telkom University',
            'content' => 'Ikhsan menunjukkan dedikasi luar biasa dalam mengembangkan DuckCost. Kemampuannya memadukan logika akuntansi dengan teknologi modern sangat impresif.',
            'rating' => 5,
        ]);

        \App\Models\Testimonial::create([
            'name' => 'Budi Santoso',
            'role' => 'Owner',
            'company' => 'Santoso Catering',
            'content' => 'Aplikasi kasir yang dibuat sangat membantu operasional harian kami. Sangat user-friendly dan akurasinya sangat tinggi.',
            'rating' => 5,
        ]);
    }
}
