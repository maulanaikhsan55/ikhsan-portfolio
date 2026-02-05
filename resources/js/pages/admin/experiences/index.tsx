import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Briefcase, Calendar } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Experiences', href: '/admin/experiences' },
];

export default function Index({ experiences }: { experiences: Experience[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            destroy(`/admin/experiences/${id}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Experiences" />

            <div className="p-8 max-w-7xl mx-auto pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Professional Path</h1>
                        <p className="text-zinc-500 font-medium">Trace your journey through the industry.</p>
                    </div>
                    <Link href="/admin/experiences/create">
                        <Button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10">
                            <Plus size={18} className="mr-2" />
                            Add Milestone
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 p-10 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group relative overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-900/10 flex items-center justify-center text-violet-600 shrink-0 group-hover:scale-110 transition-transform">
                                        <Briefcase size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-1 group-hover:text-violet-600 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-lg font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            @ {exp.company}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4 min-w-[150px]">
                                    <span className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                                        <Calendar size={14} />
                                        {exp.period}
                                    </span>

                                    <div className="flex gap-2">
                                        <Link href={`/admin/experiences/${exp.id}/edit`} className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-violet-600 transition-colors">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(exp.id)} className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-300 hover:text-rose-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link
                        href="/admin/experiences/create"
                        className="border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] flex items-center gap-6 p-10 text-zinc-300 hover:text-violet-500 hover:border-violet-500 hover:bg-violet-50/50 transition-all group h-full"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-violet-500 transition-colors">Append New History</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
