<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('admin/settings/index', [
            'settings' => \App\Models\Setting::pluck('value', 'key'),
        ]);
    }

    public function update(Request $request)
    {
        // 1. Handle Account Security Updates
        if ($request->has('email') || $request->has('new_password')) {
            $user = auth()->user();
            
            $request->validate([
                'email' => 'required|email|unique:users,email,' . $user->id,
                'new_password' => 'nullable|min:8',
                'confirm_password' => 'nullable|same:new_password',
            ]);

            $user->email = $request->email;
            $user->name = $request->email; // Assuming name is used as identifier/display
            
            if ($request->filled('new_password')) {
                $user->password = \Illuminate\Support\Facades\Hash::make($request->new_password);
            }
            
            // @ts-ignore (for IDEs)
            $user->save();
        }

        // 2. Handle Portfolio Settings (Dynamic)
        foreach ($request->all() as $key => $value) {
            if ($key === 'settings') {
                foreach ($value as $sKey => $sValue) {
                    \App\Models\Setting::updateOrCreate(
                        ['key' => $sKey],
                        ['value' => $sValue]
                    );
                }
                continue;
            }

            if ($request->hasFile($key)) {
                $oldSetting = \App\Models\Setting::where('key', $key)->first();
                if ($oldSetting && $oldSetting->value && Storage::disk('public')->exists(str_replace('/storage/', '', $oldSetting->value))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $oldSetting->value));
                }

                $path = $request->file($key)->store('settings', 'public');
                \App\Models\Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => '/storage/' . $path]
                );
            }
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
