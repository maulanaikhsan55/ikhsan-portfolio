import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { StatsCard } from '@/components/admin/dashboard/stats-card';
import { AnalyticsCharts } from '@/components/admin/dashboard/analytics-charts';
import { BarChart3, Mail, Eye, TrendingUp, MessageSquare, Plus, Layers, Briefcase, Award, Zap } from 'lucide-react';

interface DashboardProps {
    total_views: number;
    total_messages: number;
    new_messages: number;
    project_views: { title: string; views_count: number }[];
    message_trends: { date: string; count: number }[];
    recent_messages: { id: number; name: string; subject: string; created_at: string }[];
}

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    total_views,
    total_messages,
    new_messages,
    project_views,
    message_trends,
    recent_messages
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-4 md:p-8 overflow-x-hidden">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">Intelligence Hub</h1>
                    <p className="text-zinc-500 text-sm">Real-time portfolio analytics and content management.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title="Total Project Views"
                        value={total_views?.toLocaleString() || '0'}
                        icon={<Eye />}
                        description="Cumulative views across all projects"
                    />
                    <StatsCard
                        title="Total Messages"
                        value={total_messages?.toLocaleString() || '0'}
                        icon={<Mail />}
                        description="All-time received messages"
                    />
                    <StatsCard
                        title="New Inquiries (7d)"
                        value={new_messages?.toLocaleString() || '0'}
                        icon={<TrendingUp />}
                        className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 border-none"
                        description="Messages in the last week"
                    />
                </div>

                {/* Charts */}
                <AnalyticsCharts projectViews={project_views || []} messageTrends={message_trends || []} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions (CMS) */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/admin/projects" className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex flex-col justify-between aspect-square">
                            <Layers className="text-zinc-400 group-hover:text-violet-500 transition-colors" size={24} />
                            <span className="font-bold text-sm uppercase tracking-wider">Projects</span>
                        </Link>
                        <Link href="/admin/experiences" className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex flex-col justify-between aspect-square">
                            <Briefcase className="text-zinc-400 group-hover:text-violet-500 transition-colors" size={24} />
                            <span className="font-bold text-sm uppercase tracking-wider">Experience</span>
                        </Link>
                        <Link href="/admin/skills" className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex flex-col justify-between aspect-square">
                            <Zap className="text-zinc-400 group-hover:text-violet-500 transition-colors" size={24} />
                            <span className="font-bold text-sm uppercase tracking-wider">Skills</span>
                        </Link>
                        <Link href="/admin/certifications" className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-violet-500/50 transition-all flex flex-col justify-between aspect-square">
                            <Award className="text-zinc-400 group-hover:text-violet-500 transition-colors" size={24} />
                            <span className="font-bold text-sm uppercase tracking-wider">Awards</span>
                        </Link>
                    </div>

                    {/* Recent Messages List */}
                    <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                            <MessageSquare size={14} /> Recent Messages
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {recent_messages && recent_messages.length > 0 ? (
                                recent_messages.map(msg => (
                                    <Link key={msg.id} href={`/admin/messages/${msg.id}`} className="block p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-colors group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm">{msg.name}</span>
                                            <span className="text-[10px] text-zinc-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 truncate">{msg.subject}</p>
                                    </Link>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                                    <Mail size={24} className="mb-2 opacity-50" />
                                    <p className="text-xs">No recent messages</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
