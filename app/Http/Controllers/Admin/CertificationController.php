<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificationController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/certifications/index', [
            'certifications' => Certification::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/certifications/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'org' => 'required',
            'period' => 'required',
            'score' => 'required',
        ]);

        Certification::create($validated);

        return redirect()->route('admin.certifications.index');
    }

    public function edit(Certification $certification)
    {
        return Inertia::render('admin/certifications/form', [
            'certification' => $certification
        ]);
    }

    public function update(Request $request, Certification $certification)
    {
        $validated = $request->validate([
            'name' => 'required',
            'org' => 'required',
            'period' => 'required',
            'score' => 'required',
        ]);

        $certification->update($validated);

        return redirect()->route('admin.certifications.index');
    }

    public function destroy(Certification $certification)
    {
        $certification->delete();
        return redirect()->back();
    }
}
