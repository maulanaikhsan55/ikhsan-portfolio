<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:projects',
            'description' => 'required',
            'long_description' => 'required',
            'image' => 'required|image|max:2048', // Validate as image
            'category' => 'required',
            'tech' => 'required|array',
            'year' => 'required',
            'duration' => 'required',
            'client' => 'required',
            'role' => 'required',
            'features' => 'required|array',
            'screenshots' => 'nullable|array',
            'screenshots.*' => 'image|max:2048',
            'challenges' => 'required',
            'solution' => 'required',
            'featured' => 'boolean',
            'impact' => 'nullable|string',
            'tools' => 'nullable|array',
            'awards' => 'nullable|string',
            'status' => 'required|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('screenshots')) {
            $screenshots = [];
            foreach ($request->file('screenshots') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $screenshots[] = '/storage/' . $path;
            }
            $validated['screenshots'] = $screenshots;
        } else {
            $validated['screenshots'] = [];
        }

        Project::create($validated);

        return redirect()->route('admin.projects.index');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/form', [ // Fixed casing
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $project->id,
            'description' => 'required',
            'long_description' => 'required',
            'image' => 'nullable|image|max:2048', // Optional on update
            'category' => 'required',
            'tech' => 'required|array',
            'year' => 'required',
            'duration' => 'required',
            'client' => 'required',
            'role' => 'required',
            'features' => 'required|array',
            'screenshots' => 'nullable|array',
            'screenshots.*' => 'image|max:2048',
            'challenges' => 'required',
            'solution' => 'required',
            'featured' => 'boolean',
            'impact' => 'nullable|string',
            'tools' => 'nullable|array',
            'awards' => 'nullable|string',
            'status' => 'required|in:published,draft',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->image));
            }
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            unset($validated['image']);
        }

        if ($request->hasFile('screenshots')) {
            // Delete old screenshots
            if ($project->screenshots) {
                foreach ($project->screenshots as $oldPath) {
                    if (Storage::disk('public')->exists(str_replace('/storage/', '', $oldPath))) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $oldPath));
                    }
                }
            }
            
            $screenshots = [];
            foreach ($request->file('screenshots') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $screenshots[] = '/storage/' . $path;
            }
            $validated['screenshots'] = $screenshots;
        } else {
            unset($validated['screenshots']);
        }

        $project->update($validated);

        return redirect()->route('admin.projects.index');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->back();
    }
}
