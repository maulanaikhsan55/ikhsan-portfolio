<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => \App\Models\Testimonial::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/testimonials/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'content' => 'required',
            'company' => 'required',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        \App\Models\Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index');
    }

    public function edit(\App\Models\Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/form', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, \App\Models\Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'content' => 'required',
            'company' => 'required',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
             unset($validated['image']);
        }

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index');
    }

    public function destroy(\App\Models\Testimonial $testimonial)
    {
        $testimonial->delete();
        return redirect()->back();
    }
}
