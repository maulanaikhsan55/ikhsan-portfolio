import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Settings, Code2, PenTool, Database } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Skill {
    id: number;
    title: string;
    description: string;
    icon: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Skills', href: '/admin/skills' },
];

const IconComponent = ({ name }: { name: string }) => {
    switch (name) {
        case 'Settings': return <Settings size={18} />;
        case 'Code2': return <Code2 size={18} />;
        case 'PenTool': return <PenTool size={18} />;
        case 'Database': return <Database size={18} />;
        default: return <Settings size={18} />;
    }
};

export default function Index({ skills }: { skills: Skill[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this skill category?')) {
            destroy(`/admin/skills/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Skills" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Technical DNA</h1>
                        <p className="text-zinc-500">Manage your expertise categories.</p>
                    </div>
                    <Link href="/admin/skills/create">
                        <Button className="rounded-xl flex gap-2">
                            <Plus size={18} />
                            Add Skill Category
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-8 shadow-xl relative group">
                            <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mb-6 text-violet-600">
                                <IconComponent name={skill.icon} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">{skill.title}</h3>
                            <p className="text-sm text-zinc-500 mb-8 line-clamp-2">{skill.description}</p>

                            <div className="flex gap-2 pt-6 border-t border-zinc-50 dark:border-zinc-800">
                                <Link href={`/admin/skills/${skill.id}/edit`} className="flex-1">
                                    <Button variant="outline" className="w-full rounded-xl">Edit</Button>
                                </Link>
                                <button onClick={() => handleDelete(skill.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
