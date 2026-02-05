<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Certification;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

Route::get('/', function () {
    return Inertia::render('home', [
        'projects' => Project::where('status', 'published')->orderBy('year', 'desc')->get(),
        'experiences' => Experience::orderBy('period', 'desc')->get(),
        'skills' => Skill::all(),
        'certifications' => Certification::all(),
        'testimonials' => \App\Models\Testimonial::all(),
        'settings' => \App\Models\Setting::pluck('value', 'key'),
    ]);
})->name('home');

Route::get('/resume', function () {
    return Inertia::render('resume');
})->name('resume');

Route::get('/project/{slug}', function (string $slug) {
    $project = Project::where('slug', $slug)->firstOrFail();
    $project->increment('views_count');

    return Inertia::render('project-detail', [
        'project' => $project,
    ]);
})->name('project.show');

// Auth & Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);
        Route::resource('experiences', \App\Http\Controllers\Admin\ExperienceController::class);
        Route::resource('skills', \App\Http\Controllers\Admin\SkillController::class);
        Route::resource('certifications', \App\Http\Controllers\Admin\CertificationController::class);
        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
        Route::get('settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
        Route::get('messages', [\App\Http\Controllers\Admin\MessageController::class, 'index'])->name('messages.index');
        Route::get('messages/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'show'])->name('messages.show');
        Route::delete('messages/{message}', [\App\Http\Controllers\Admin\MessageController::class, 'destroy'])->name('messages.destroy');
    });
});

Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/settings.php';

