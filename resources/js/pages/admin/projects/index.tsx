import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    year: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
];

export default function Index({ projects }: { projects: Project[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.projects.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Projects" />

            <div className="p-8 max-w-7xl mx-auto pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Portfolio Works</h1>
                        <p className="text-zinc-500 font-medium">Curate and manage your high-impact case studies.</p>
                    </div>
                    <Link href={route('admin.projects.create')}>
                        <Button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10">
                            <Plus size={18} className="mr-2" />
                            Launch New Project
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 p-8 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-8xl font-black">0{project.id}</span>
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-zinc-100 dark:border-zinc-800">
                                        {project.category}
                                    </span>
                                    <span className="text-xs font-black text-zinc-300 dark:text-zinc-700">{project.year}</span>
                                </div>

                                <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-2 group-hover:text-violet-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-mono text-zinc-400 mb-8">/{project.slug}</p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
                                <div className="flex gap-2">
                                    <a href={`/project/${project.slug}`} target="_blank" className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                    <Link href={route('admin.projects.edit', project.id)} className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-violet-600 transition-colors">
                                        <Edit size={16} />
                                    </Link>
                                </div>
                                <button onClick={() => handleDelete(project.id)} className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-300 hover:text-rose-600 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Add Card */}
                    <Link
                        href={route('admin.projects.create')}
                        className="border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-zinc-300 hover:text-violet-500 hover:border-violet-500 hover:bg-violet-50/50 transition-all group h-full"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">New Genesis</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

// Helper to handle named routes in JS
const route = (name: string, id?: number) => {
    switch (name) {
        case 'admin.projects.create': return '/admin/projects/create';
        case 'admin.projects.edit': return `/admin/projects/${id}/edit`;
        case 'admin.projects.destroy': return `/admin/projects/${id}`;
        default: return '';
    }
};
