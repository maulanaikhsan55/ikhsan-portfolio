<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experiences/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required',
            'company_logo' => 'nullable|image|max:2048',
            'role' => 'required',
            'period' => 'required',
            'desc' => 'required',
            'achievements' => 'required|array',
        ]);

        if ($request->hasFile('company_logo')) {
            $path = $request->file('company_logo')->store('companies', 'public');
            $validated['company_logo'] = '/storage/' . $path;
        }

        Experience::create($validated);

        return redirect()->route('admin.experiences.index');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experiences/form', [
            'experience' => $experience
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'company' => 'required',
            'company_logo' => 'nullable|image|max:2048',
            'role' => 'required',
            'period' => 'required',
            'desc' => 'required',
            'achievements' => 'required|array',
        ]);

        if ($request->hasFile('company_logo')) {
            // Delete old logo if exists
            if ($experience->company_logo && Storage::disk('public')->exists(str_replace('/storage/', '', $experience->company_logo))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $experience->company_logo));
            }
            $path = $request->file('company_logo')->store('companies', 'public');
            $validated['company_logo'] = '/storage/' . $path;
        } else {
            unset($validated['company_logo']);
        }

        $experience->update($validated);

        return redirect()->route('admin.experiences.index');
    }

    public function destroy(Experience $experience)
    {
        if ($experience->company_logo && Storage::disk('public')->exists(str_replace('/storage/', '', $experience->company_logo))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $experience->company_logo));
        }
        $experience->delete();
        return redirect()->back();
    }
}
