<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/messages/index', [
            'messages' => Message::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function show(Message $message)
    {
        $message->update(['is_read' => true]);
        
        return Inertia::render('admin/messages/show', [
            'message' => $message
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index');
    }
}
