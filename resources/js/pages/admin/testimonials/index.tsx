import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Testimonials', href: '/admin/testimonials' },
];

export default function Index({ testimonials }: { testimonials: Testimonial[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Testimonials" />

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Testimonials</h1>
                        <p className="text-zinc-500">Manage client feedback.</p>
                    </div>
                    <Link href={route('admin.testimonials.create')}>
                        <Button className="rounded-xl flex gap-2">
                            <Plus size={18} />
                            Add Testimonial
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl shadow-black/5">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Name</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Role</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Company</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            {testimonial.image && (
                                                <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                                            )}
                                            <div className="font-bold text-zinc-900 dark:text-white">{testimonial.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500 font-medium">{testimonial.role}</td>
                                    <td className="px-8 py-6 text-zinc-500 font-medium">{testimonial.company}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('admin.testimonials.edit', testimonial.id)} className="p-2 text-zinc-400 hover:text-violet-600 transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
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

// Helper to handle named routes in JS
const route = (name: string, id?: number) => {
    switch (name) {
        case 'admin.testimonials.create': return '/admin/testimonials/create';
        case 'admin.testimonials.edit': return `/admin/testimonials/${id}/edit`;
        case 'admin.testimonials.destroy': return `/admin/testimonials/${id}`;
        default: return '';
    }
};
