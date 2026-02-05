<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Total Metrics
        $totalViews = Project::sum('views_count');
        $totalMessages = Message::count();
        $newMessages = Message::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        // 2. Project Views for Bar Chart (Top 5)
        $projectViews = Project::select('title', 'views_count')
            ->orderBy('views_count', 'desc')
            ->limit(5)
            ->get();

        // 3. Message Trends (Last 30 Days)
        $messageTrends = Message::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // 4. Recent Messages
        $recentMessages = Message::latest()->limit(5)->get();

        return Inertia::render('dashboard', [
            'total_views' => $totalViews,
            'total_messages' => $totalMessages,
            'new_messages' => $newMessages,
            'project_views' => $projectViews,
            'message_trends' => $messageTrends,
            'recent_messages' => $recentMessages,
        ]);
    }
}
