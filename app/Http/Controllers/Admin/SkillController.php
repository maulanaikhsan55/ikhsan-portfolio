<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/skills/index', [
            'skills' => Skill::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/skills/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'items' => 'required|array',
            'icon' => 'required',
        ]);

        Skill::create($validated);

        return redirect()->route('admin.skills.index');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('admin/skills/form', [
            'skill' => $skill
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'items' => 'required|array',
            'icon' => 'required',
        ]);

        $skill->update($validated);

        return redirect()->route('admin.skills.index');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return redirect()->back();
    }
}
