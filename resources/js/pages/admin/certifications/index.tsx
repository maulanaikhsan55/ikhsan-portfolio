import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Certification {
    id: number;
    name: string;
    org: string;
    period: string;
    score: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Certifications', href: '/admin/certifications' },
];

export default function Index({ certifications }: { certifications: Certification[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this certification?')) {
            destroy(`/admin/certifications/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Certifications" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Certifications</h1>
                        <p className="text-zinc-500">Manage your educational credentials.</p>
                    </div>
                    <Link href="/admin/certifications/create">
                        <Button className="rounded-xl flex gap-2">
                            <Plus size={18} />
                            Add Certification
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Name</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Organization</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Period</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {certifications.map((cert) => (
                                <tr key={cert.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6 font-bold">{cert.name}</td>
                                    <td className="px-8 py-6 text-zinc-500">{cert.org}</td>
                                    <td className="px-8 py-6 text-zinc-500 text-sm">{cert.period}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/certifications/${cert.id}/edit`} className="p-2 text-zinc-400 hover:text-violet-600 transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(cert.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
